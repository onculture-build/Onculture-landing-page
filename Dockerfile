FROM node:18-alpine3.17 
WORKDIR /app
COPY package.json yarn.lock /
RUN npm install
# Build copy all source files and build React app
COPY . .
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]