

### BUILD CONTAINER
FROM node:12 AS build
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .
RUN npm run build


### RELEASE CONTAINER
FROM node:12 AS release
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY package.json package.json
COPY package-lock.json package-lock.json
#COPY .env .env

CMD [ "node", "./dist/main.js" ]

