import datetime

def print_temperature(date, min_temperature, max_temperature):
    print(f"{date};{min_temperature};{max_temperature}")

def main():

    with open("Utomhus_2023-05-15.csv") as fp:
        lines = fp.readlines()

    print_temperature("date", "min_temperature", "max_temperature")

    current_date = None
    for line in lines:
        fields = line.split(";")
        if (len(fields) != 4):
            continue
        try:
            timestamp = int(fields[0])
        except ValueError:
            continue
        date_str = fields[1]
        temperature = float(fields[2])
        humidity = float(fields[3])
        d = datetime.datetime.fromtimestamp(timestamp)
        date = d.date()
        if (date != current_date):
            if (current_date is not None):
                print_temperature(date, min_temperature, max_temperature)
            current_date = date
            min_temperature = temperature
            max_temperature = temperature
        else:
            min_temperature = min(min_temperature, temperature)
            max_temperature = max(max_temperature, temperature)

    print_temperature(date, min_temperature, max_temperature)

if __name__ == "__main__":
    main()
