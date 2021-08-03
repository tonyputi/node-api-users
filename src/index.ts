/**
 * Required External Modules
 */

import express from "express";
// import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import cors from "cors";
import helmet from "helmet";

import config from "./config/config";
import mongoose from "mongoose"
import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"

/**
 * App Variables
 */

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

mongoose.connect(config.mongo.uri, config.mongo.options).then(result => {
    console.info('Successful connect to mongodb instance')
}).catch(err => {
    console.error(`An error occurred connecting to mongodb instance ${err}`)
});

/** Parse the body of the request */
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

app.use('/', authRoutes)
app.use('/users', userRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(config.server.port, () => {
    console.info(`Server is running ${config.server.hostname}:${config.server.port}`);
});
