import dotenv from 'dotenv';

dotenv.config();

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
    // url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
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
    mongo: MONGO,
    server: SERVER,
    jwt: JWT
};

export default config;