#!/usr/bin/env -S python3 -u

from http.server import BaseHTTPRequestHandler
from http.server import HTTPServer
from http.server import test

import datetime
import json
import requests
import sys

hostName = "localhost"
serverPort = 8080

class WeatherServer(BaseHTTPRequestHandler):
    def do_GET(self):
        url = 'https://app.netatmo.net/api/getmeasure'
        date_begin = datetime.datetime(2023, 1, 1)
        request = {
            "date_begin": str(date_begin.timestamp()),
            "scale": "1day",
            "device_id": "70:ee:50:3f:2f:d0",
            "module_id": "02:00:00:3e:e3:70",
            "type": "min_temp,max_temp",
            "real_time": True,
            }
        headers = {
            "Authorization": "Bearer 52d42bfc1777599b298b456c|90035caa57ecd5dbaab93dddd1fdc775",
        }

        response = requests.post(url, headers=headers, json=request)

        response.raise_for_status()

        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Content-type", "application.json")
        self.end_headers()

        self.wfile.write(bytes("date,variant,temperature\n", "utf-8"))

        data = json.loads(response.text)
        chunks = data["body"]
        for chunk in chunks:
            beg_time = datetime.datetime.fromtimestamp(chunk["beg_time"])
            step_time = datetime.timedelta(seconds=chunk["step_time"])
            values = chunk["value"]
            current_time = beg_time
            for [min_temp, max_temp] in values:
                current_time = current_time + step_time
                self.wfile.write(bytes(f"{current_time},min,{min_temp}\n", "utf-8"))
                self.wfile.write(bytes(f"{current_time},max,{max_temp}\n", "utf-8"))

if __name__ == '__main__':
    webServer = HTTPServer((hostName, serverPort), WeatherServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
