FROM nginx:latest

EXPOSE 8080

RUN usermod -u 1000 nginx && \
    groupmod -g 1000 nginx

COPY nginx /etc/nginx/

RUN mkdir -p /data/nginx/cache
RUN rm -rf /usr/share/nginx/html/*
RUN rm -f /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /etc/nginx/ && \
    chown -R nginx:nginx /usr/share/nginx/ && \
    chown -R nginx:nginx /data/nginx

USER nginx

ADD build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]