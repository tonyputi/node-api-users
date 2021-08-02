FROM node:alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./src/ .
RUN npm install

#EXPOSE 80
CMD ["nodemon", "server.js"]