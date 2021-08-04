'use strict';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/postgres/user';
import config from "../../config/config";

/**
 * Handle user login requests
 * 
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Response}
 */
const login = (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;    

    return User.findOne({where: {email}})
        .then((user: any) => {
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