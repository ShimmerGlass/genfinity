FROM node:20-bullseye AS ui

RUN mkdir /app
COPY ui /app

WORKDIR /app
RUN yarn install
RUN yarn build

FROM golang:1-bullseye AS backend

RUN mkdir /app
COPY . /app
COPY --from=ui /app/build /app/ui/build
WORKDIR /app

RUN go build .

FROM ubuntu:22.04

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates wget
RUN echo "deb https://download.opensuse.org/repositories/home:/t-paul/xUbuntu_22.04/ ./" > /etc/apt/sources.list.d/openscad.list
RUN wget -qO- https://files.openscad.org/OBS-Repository-Key.pub > /etc/apt/trusted.gpg.d/obs-openscad-nightly.asc
RUN apt-get update && apt-get install -y openscad-nightly

RUN mkdir /app
COPY --from=backend /app/genfinity /app
RUN mkdir gridfinity 
COPY --from=backend /app/gridfinity /app/gridfinity
COPY etc/config.yaml /app
WORKDIR /app
RUN mkdir stl

EXPOSE 8888
CMD [ "./genfinity", "-cfg", "config.yaml" ]
