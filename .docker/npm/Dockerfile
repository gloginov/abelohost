FROM node:25.8.0 AS base

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

############################################
# Этот этап используется для сборки        #
############################################
FROM base AS build

# copy the app, note .dockerignore
COPY ./src /usr/src/app
# для соответствия с продом
RUN npm install --loglevel verbose --no-package-lock
# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

############################################
# Этот этап используется для разработки    #
############################################
FROM base AS dev

# EXPOSE 5173
EXPOSE 3000
# ADD docker/npm/start.sh /start.sh
# RUN chmod 775 /start.sh

CMD /bin/bash -c "tail -f /dev/null"