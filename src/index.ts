'use strict';

/**
 * Required External Modules
 */

import express from "express";
import { NextFunction, Request, Response } from "express";
import { Sequelize } from "sequelize";

import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose"

import config from "./config/config";
import routes from "./routes/routes"

/**
 * App Variables
 */

const app = express();
const sequelize = new Sequelize(config.postgres.uri);

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

/** Initialize postgres driver */
sequelize.authenticate().then(result => {
    console.info('Successful connect to mongodb instance')
}).catch(err => {
    console.error(`An error occurred connecting to mongodb instance ${err}`)
}).finally(() => {
    sequelize.close();
});

/** Initialize mongo driver */
mongoose.connect(config.mongo.uri, config.mongo.options).then(result => {
    console.info('Successful connect to mongodb instance')
}).catch(err => {
    console.error(`An error occurred connecting to mongodb instance ${err}`)
});

/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Registering application routes */
app.use('/', routes);

app.listen(config.server.port, () => {
    console.info(`Server is running ${config.server.hostname}:${config.server.port}`);
});
