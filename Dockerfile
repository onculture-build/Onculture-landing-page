FROM node:18-alpine as build 
WORKDIR /
# Install npm packages and cache this layer
COPY package*.json /
RUN yarn install
# Build copy all source files and build React app
COPY ./ /
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]

# Pull NGINX image
FROM nginx:1.15
# Move all build files to NGINX serve folder
COPY --from=build /app/dist /usr/share/nginx/html
# Setup NGINX with config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf