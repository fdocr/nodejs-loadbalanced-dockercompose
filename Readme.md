# Node.JS - Docker Compose - Nginx Proxy

This repo is an example use of docker-compose with a simple front Node.js app. I'm looking into diving as deep as possible into distributing workloads and this is my first attempt to practice with [docker-compose](https://docs.docker.com/compose/). The idea is to load balance the requests amongst multiple nodes behind a proxy. I used an amazing image from [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy) to dynamically reload the conf files of an nginx-proxy (that's the tricky part) of containers.

A blog post on [visualcosita.xyz](http://visualcosita.xyz) is soon to come. But in few words this is a slightly opinionated use of an Express template (without much modification) to hold a counter of hits based on ip addresses that request them, the idea came from [this python repo](https://github.com/bfirsh/compose-mongodb-demo) that is actually much more minimalist (I'm trying to make use of good practices for more serious projects on the future).

### Usage

`docker-compose up -d` should boot the proxy->front->mongodb properly (or `make`, all other commands in the Makefile where used for debugging).

To scale the front service run `docker-compose scale front=3`. Requests should be distributed to all three nodes, this can be verified executing `docker-compose logs` and querying to the url `curl front.IP_ADDRESS.xip.io` or in a browser.

I used `docker-machine` since I'm a Mac user, but the `docker-compose.yml` should support native Linux environments (the difference should be the IP address to query).
