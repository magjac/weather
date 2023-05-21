all: data server front-end

data:
	./weather.py > Utomhus_2023-05-15_min_max3.csv

start-server:
	./server.py 2>&1 > server.log &

start-front-end: install start

install:
	cd front-end && npm install

start:
	cd front-end && npm start
