'use strict';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from "../config/config";

export default (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];

    if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
        return res.sendStatus(401);
    }

    const token = authorization.split(' ')[1];
    jwt.verify(token, config.jwt.secret, function(err: any, user: any) {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
    });

    return next();
}