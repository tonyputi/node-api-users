/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import mongoose from "mongoose"

import userRoutes from "./routes/userRoutes"

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const MONGO_URI: string = process.env.MONGODB_URI;
const MONGO_OPTIONS = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

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

mongoose.connect(MONGO_URI, MONGO_OPTIONS).then(function(){
    console.log('Successful connect to mongodb instance')
}, function(err) {
    console.log(`An error occurred connecting to mongodb instance ${err}`)
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use("/users", userRoutes)
// userRoutes(app)

// app.get('/', function(req, res) {
//     res.json({"message": "unauthenticated"});
// });