FROM node:16 AS base
WORKDIR /usr/src/app

COPY . .

RUN npm ci

FROM base as test-stage

RUN CI=true npm run test

FROM base as build-stage

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm run build

RUN npm install -g serve
CMD ["serve", "build"]