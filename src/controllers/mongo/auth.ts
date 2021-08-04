'use strict';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/mongo/user';
import config from "../../config/config";

/**
 * Handle user login requests
 * 
 * @param req
 * @param res
 * @param next
 * @return response
 */
const login = (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    return User.findOne({email})
        .select('password')
        .then(user => {
            if (!user || !user.checkPassword(password)) {
                return res.status(404).json({message: 'not found'})
            }

            return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, config.jwt.secret) });
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

export default { login };