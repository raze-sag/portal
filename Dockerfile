FROM node:18-alpine3.20 AS builder
ARG ARG_APP_HOME=/home/node/app
WORKDIR $ARG_APP_HOME

COPY package*.json ./
RUN npm i
COPY . . 
RUN npm run build:prod

FROM node:18-alpine3.20
ARG ARG_APP_HOME=/home/node/app
ENV NODE_ENV=production
WORKDIR $ARG_APP_HOME

RUN npm install -g serve@14.2.0

COPY --from=builder $ARG_APP_HOME/build ./build

# Use user id instead of user name to allow Kubernetes to check for non-root user
USER 1000

EXPOSE 80
CMD ["serve", "-l", "80", "build"]
