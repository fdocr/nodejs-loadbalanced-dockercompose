# Node.JS - Docker Compose - Nginx Proxy

This repo is an example use of docker-compose with a simple front Node.js app. I'm looking into diving as deep as possible into distributing workloads and this is my first attempt to practice with [docker-compose](https://docs.docker.com/compose/). The idea is to load balance the requests amongst multiple nodes behind a proxy. I used an amazing image from [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy) to dynamically reload the conf files of an nginx-proxy (that's the tricky part) of containers.

A blog post that explains slightly better and in depth can be [found at visualcosita.xyz](http://visualcosita.xyz/post/load-balancing-a-node-js-app-behind-nginx-proxy-managed-by-docker-compose/).

But in few words this is a slightly opinionated use of the Express template to hold a counter of hits based on ip addresses that request them, the idea came from [this python repo](https://github.com/bfirsh/compose-mongodb-demo) that is actually much more minimalist.

### Usage

`docker-compose up -d` should boot the proxy->front->mongodb properly (or execute `make`, all other commands in the Makefile where used for debugging).

To scale the front service run `docker-compose scale front=3`. Requests should be distributed to all three nodes, this can be verified executing `docker-compose logs` and querying to the url `curl front.IP_ADDRESS.xip.io` or in a browser.

I used `docker-machine` since I'm a Mac user, but the `docker-compose.yml` should support native Linux environments (the difference should be the IP address to query).
