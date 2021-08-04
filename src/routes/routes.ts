'use strict';

import express from "express";
import { NextFunction, Request, Response } from "express";
import mongoAuthRoutes from "./mongo/auth";
import mongoUserRoutes from "./mongo/user";
import postgresAuthRoutes from "./postgres/auth";
import postgresUserRoutes from "./postgres/user";

const router = express.Router();

router.use('/mongo', mongoAuthRoutes);
router.use('/mongo/users', mongoUserRoutes);
router.use('/postgres', postgresAuthRoutes);
router.use('/postgres/users', postgresUserRoutes);

/** Catching not found url */
router.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ url: `${req.originalUrl} not found` })
});

export = router;