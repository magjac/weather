#!/usr/bin/env -S python3 -u

from http.server import BaseHTTPRequestHandler
from http.server import HTTPServer
from http.server import test

import requests
import urllib

hostName = "localhost"
serverPort = 8080

class WeatherServer(BaseHTTPRequestHandler):
    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        query = u.query

        url = 'https://app.netatmo.net/api/getmeasure'
        request = urllib.parse.parse_qsl(query)
        headers = {
            "Authorization": "Bearer 52d42bfc1777599b298b456c|90035caa57ecd5dbaab93dddd1fdc775",
        }

        response = requests.post(url, headers=headers, data=request)

        response.raise_for_status()

        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Content-type", "application.json")
        self.end_headers()

        self.wfile.write(bytes(response.text, "utf-8"))

if __name__ == '__main__':
    webServer = HTTPServer((hostName, serverPort), WeatherServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
