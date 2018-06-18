FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

ADD nginx/server.conf /etc/nginx/conf.d/default.conf
ADD build /usr/share/nginx/html
