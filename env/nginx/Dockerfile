FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/

HEALTHCHECK --interval=30s --timeout=10s --start-period=1s --retries=4 \
  CMD ["CMD", "service", "nginx", "status"]

EXPOSE 80
