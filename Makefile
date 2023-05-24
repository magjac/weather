all: data server front-end

start-server:
	./server.py 2>&1 > server.log &

start-front-end: install start

install:
	cd front-end && npm install

start:
	cd front-end && npm start

deploy:
	scp -rp -P 7822 front-end/build/* magjac.com:www/weather
	scp -rp -P 7822 server.py magjac.com:www/weather
