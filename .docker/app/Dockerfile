FROM node:latest AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./src/ /usr/src/app
RUN npm i --loglevel verbose
RUN npm run build

FROM nginx:latest AS app

EXPOSE 8080

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY .docker/app/server.conf /etc/nginx/conf.d/default.conf

CMD nginx -g "daemon off;"