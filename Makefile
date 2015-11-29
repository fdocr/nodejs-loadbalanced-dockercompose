.PHONY: all build front

all: build

build:
	docker-compose up -d

front:
	docker build --rm --force-rm -t tut_front .
	-docker rm -f front1
	docker run -d -p 3000:3000 --name front1 --link mongo1:mongo tut_front

dfront: front
	-docker logs -f front1
