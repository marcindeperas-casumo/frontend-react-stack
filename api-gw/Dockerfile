FROM node:6-alpine

RUN mkdir -p /opt/foo-service
WORKDIR /opt/foo-service

COPY package.json /opt/foo-service
RUN yarn --production

COPY . /opt/foo-service

ENV PORT=3101
EXPOSE 3101
ENTRYPOINT ["yarn", "start"]
