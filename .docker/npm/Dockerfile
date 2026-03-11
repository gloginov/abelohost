FROM node:25.8.0 AS base

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

############################################
# Этот этап используется для сборки        #
############################################
FROM base AS build

COPY ./src /usr/src/app
RUN npm install --loglevel verbose --no-package-lock
RUN npm run build

############################################
# Этот этап используется для разработки    #
############################################
FROM base AS dev

EXPOSE 3000
# CMD ["npm", "run", "dev"]

# for use bash in container
CMD /bin/bash -c "tail -f /dev/null"

############################################
# Этот этап используется для prod сборки   #
############################################
FROM base AS prod

CMD ["npm", "run", "start"]