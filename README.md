# Node API users

## Preface

Welcome to the users microservice.
This microservice is exposing a bunch of endpoints to interact with users.

The purpose of the assignement is just to create a bunch of APIs to proof the level of knowledge designing REST API.
I'm pretty sure that there are several other libraries that can accomplish the job much better but here I'm just
taking care about the code style, the quality of the code and the organization in the whole view. 

The application is serving two endpoint groups: `mongo` and `postres` so if you wanna try to create a new user into the 
mongo db you have to prefix your request url like `http://localhost/mongo/`.

| METHOD | URI                           | DESCRIPTION                            |
|--------|-------------------------------|----------------------------------------|
| GET    | http://localhost/mongo/       | Get all the users stored into mongodb  |
| POST   | http://localhost/mongo/       | Create a new user into mongodb         |
| GET    | http://localhost/mongo/:id    | Get user detail from mongodb           |
| PUT    | http://localhost/mongo/:id    | Update user detail from mongodb        |
| DELETE | http://localhost/mongo/:id    | Delete user from mongodb               |
| GET    | http://localhost/postgres/    | Get all the users stored into postgres |
| POST   | http://localhost/postgres/    | Create a new user into postgres        |
| GET    | http://localhost/postgres/:id | Get user detail from postgres          |
| PUT    | http://localhost/postgres/:id | Update user detail from postgres       |
| DELETE | http://localhost/postgres/:id | Delete user from postgres              |

The application is making use the following frameworks/libraries:

- [Expressjs](https://expressjs.com) to handle HTTP requests to api endpoints;
- [Mongoose](https://mongoosejs.com) to interact with mongodb;
- [Sequelize](https://sequelize.org) to interact with postgres;
- [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js) to hash user password;
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) to generate and verify jwt tokens;

## Requirements

- Docker
- Docker Compose
- Make

## Installation

1. Type `make build` to build the docker image
2. Type `make up` to start the docker containers and wait few seconds to let containers proper start

## Testing the application

In order to test the application you need to be able to make request to the microservice and to accomplish this you can 
find a `postman_collection.json` file that already contain all the request to make you able to test it.
I suggest to you to add the following test script to all yours `login` api request in order to save the `token` as variable 
inside your postman collection and use it for all subsequents calls:

```javascript
if (responseCode.code === 200) {
    var response = pm.response.json();
    pm.collectionVariables.set('token', response.token);
}
```

## Available `make` commands list

- `make build` build new docker image and clean everything after;
- `make up` start the containers;
- `make down` stop the containers;
- `make restart` restart the containers;
- `make shell` start new shell within the app container;
- `make clean` remove unused docker layers.

## Known issue and improvements