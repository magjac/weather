#!/usr/bin/env python3

import datetime
import json
import requests
import weather

def main():

    print("date,variant,temperature")

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
    data = json.loads(response.text)
    chunks = data["body"]
    for chunk in chunks:
        beg_time = datetime.datetime.fromtimestamp(chunk["beg_time"])
        step_time = datetime.timedelta(seconds=chunk["step_time"])
        values = chunk["value"]
        current_time = beg_time
        for [min_temp, max_temp] in values:
            current_time = current_time + step_time
            weather.print_temperature(current_time, min_temp, max_temp)

if __name__ == "__main__":
    main()
