FROM node:17.0.0-alpine
WORKDIR /app
COPY . /app
RUN yarn install
EXPOSE 3000
CMD yarn start