FROM node:22.0.0-alpine
WORKDIR /app
COPY . /app
RUN yarn install
EXPOSE 3000
CMD yarn start