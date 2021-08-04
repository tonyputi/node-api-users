'use strict';

import dotenv from 'dotenv';

dotenv.config();

const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'docker';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'docker';
const POSTGRES_HOST = process.env.POSTGRES_HOST || `postgres:5432/api`;

const POSTGRES = {
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
    username: POSTGRES_USERNAME,
    uri: `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}`
};


const MONGO_USERNAME = process.env.MONGO_USERNAME || 'docker';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'docker';
const MONGO_HOST = process.env.MONGO_HOST || `mongodb:27017/api`;
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: true,
    retryWrites: false
};

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    // uri: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
    uri: `mongodb://${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 80;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const JWT = {
    secret: 'your-very-strong-secret'
}

const config = {
    postgres: POSTGRES,
    mongo: MONGO,
    server: SERVER,
    jwt: JWT
};

export default config;