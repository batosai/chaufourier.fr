ARG NODE_IMAGE=node:18.15.0-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init

# for libvips : sharp
RUN apk add vips-dev vips-cpp musl build-base --update-cache

RUN apk add --no-cache sqlite

RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
#RUN npm rebuild --verbose sharp
#RUN npm rebuild --verbose sqlite3
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]

# prod juste le build pas le reste
