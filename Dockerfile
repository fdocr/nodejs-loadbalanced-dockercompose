#################################
# Dockerfile for - Front Example
#################################
FROM node
MAINTAINER Fernando Valverde <fdov88@gmail.com>

# Copy dependencies & install them
# This layer will cache dependencies while they don't change
ADD package.json /opt/front/package.json
RUN cd /opt/front && \
    npm install
EXPOSE 3000

WORKDIR /opt/front

# Source->Deploy->Cleanup
ADD . /opt/front
CMD node ./bin/www
