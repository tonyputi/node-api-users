/**
 * Required External Modules
 */

import express from "express";
import { NextFunction, Request, Response } from "express";
import { Sequelize } from 'sequelize';

import cors from "cors";
import helmet from "helmet";

import config from "./config/config";
import mongoose from "mongoose"
import mongoAuthRoutes from "./routes/mongo/auth"
import mongoUserRoutes from "./routes/mongo/user"
import postgresAuthRoutes from "./routes/postgres/auth"
import postgresUserRoutes from "./routes/postgres/user"

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

sequelize.authenticate().then(result => {
    console.info('Successful connect to mongodb instance')
}).catch(err => {
    console.error(`An error occurred connecting to mongodb instance ${err}`)
}).finally(() => {
    sequelize.close();
});

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

app.use('/mongo', mongoAuthRoutes)
app.use('/mongo/users', mongoUserRoutes)
app.use('/postgres', postgresAuthRoutes)
app.use('/postgres/users', postgresUserRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(config.server.port, () => {
    console.info(`Server is running ${config.server.hostname}:${config.server.port}`);
});
