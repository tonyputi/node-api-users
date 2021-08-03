'use strict';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../../models/mongo/user';

const index = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then(users => {
            return res.status(200).json({
                data: users,
                meta: {
                    count: users.length
                }
            })
        })
        .catch(error => {
            return res.status(500).json({
               message: error.message,
               error
            });
        })
};

const create = (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name, email, password
    });

    return user.save()
        .then(result => {
            return res.status(201).json({
                data: result
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    return User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'not found'})
            }

            return res.status(200).json({
                data: user
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

const update = (req: Request, res: Response, next: NextFunction) => {
    return User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, user) => {
        if (!user) {
            return res.status(404).json({message: 'not found'})
        }

        if (error) {
            return res.status(500).json({
                message: error.message,
                error
            });
        }

        return res.status(200).json({
            data: user
        });
    });
};

const destroy = (req: Request, res: Response, next: NextFunction) => {
    return User.findByIdAndRemove(req.params.id, (error, user) => {
        if (!user) {
            return res.status(404).json({message: 'not found'})
        }

        if (error) {
            return res.status(500).json({
                message: error.message,
                error
            });
        }

        return res.status(204).send();
    });
};

export default { index, create, read, update, destroy };