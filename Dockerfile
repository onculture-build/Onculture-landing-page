FROM node:18-alpine AS build


WORKDIR /app

COPY package.json yarn.lock ./


RUN yarn install --frozen-lockfile


COPY . .


RUN  yarn run build

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
