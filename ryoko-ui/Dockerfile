FROM node:19 as build-stage

WORKDIR /ryoko-ui

# required to install packages
COPY ./package.json /ryoko-ui/

# installing npm packages
RUN npm install

COPY ./ /ryoko-ui/

# creating production build to serve through nginx
RUN env &&\
    npm run build

# starting second, nginx build-stage
FROM nginx:stable-alpine

# copying our config
COPY --from=build-stage /ryoko-ui/nginx_server.conf /etc/nginx/conf.d/default.conf

# copying our build
COPY --from=build-stage /ryoko-ui/build/ /usr/share/nginx/html

# exposing port 3000 on container
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]