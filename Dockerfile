FROM node:14

# WORKDIR /app

COPY src/ .

RUN npm install -g nodemon
RUN npm install

EXPOSE 8080
CMD ["nodemon", "server.js"]