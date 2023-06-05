all: data server front-end

start-server:
	./server.py 2>&1 > server.log &

start-front-end: install start

install:
	cd front-end && npm install

start:
	cd front-end && npm start
