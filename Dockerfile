# FROM node:18-alpine as build 
# WORKDIR /
# # Install npm packages and cache this layer
# COPY package*.json /
# RUN yarn install
# # Build copy all source files and build React app
# COPY ./ /
# RUN yarn run build

# EXPOSE 3000

# CMD ["yarn", "start"]

# # Pull NGINX image
# FROM nginx:1.15
# # Move all build files to NGINX serve folder
# COPY --from=build /app/dist /usr/share/nginx/html
# # Setup NGINX with config
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf


# FROM node:18-alpine
# WORKDIR /app
# # Install npm packages and cache this layer
# COPY package.json yarn.lock ./

# # ENV NODE_OPTIONS="--max_old_space_size=4096"
# RUN yarn install
# # Build copy all source files and build React app
# COPY . .
# RUN yarn run build

# EXPOSE 3002

# CMD ["yarn", "start"]




FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./


RUN yarn install --frozen-lockfile

COPY . .

RUN  yarn run build

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 3000
