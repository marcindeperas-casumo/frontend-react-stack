FROM nginx:1.21.3

EXPOSE 8080

RUN usermod -u 1000 nginx && \
    groupmod -g 1000 nginx

COPY nginx /etc/nginx/

RUN mkdir -p /data/nginx/cache && \
    rm -rf /usr/share/nginx/html/* && \
    rm -f /etc/nginx/conf.d/default.conf && \
    chown -R nginx:nginx /etc/nginx/ && \
    chown -R nginx:nginx /usr/share/nginx/ && \
    chown -R nginx:nginx /data/nginx

USER nginx

COPY build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]