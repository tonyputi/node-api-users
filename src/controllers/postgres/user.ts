'use strict';

import { NextFunction, Request, Response } from 'express';
import User from '../../models/postgres/user';

/**
 * Handle user index requests
 * 
 * @param req
 * @param res
 * @param next
 * @return response
 */
const index = (req: Request, res: Response, next: NextFunction) => {
    return User.sync().then(() => {
        return User.findAll().then(users => {
            return res.status(200).json({
                data: users,
                meta: {
                    count: users.length
                }
            })
        }).catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    });
};

/**
 * Handle user create requests
 * 
 * @param req
 * @param res
 * @param next
 * @return response
 */
const create = (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body;

    return User.sync().then(() => {
        return User.create({name, email, password})
            .then(user => {
                return res.status(201).json({
                    data: user
                }) 
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

/**
 * Handle user read requests
 * 
 * @param req
 * @param res
 * @param next
 * @return response
 */
const read = (req: Request, res: Response, next: NextFunction) => {
    return User.sync().then(() => {
        return User.findByPk(req.params.id)
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
    });
};

/**
 * Handle user update requests
 * 
 * @param req
 * @param res
 * @param next
 * @return response
 */
const update = (req: Request, res: Response, next: NextFunction) => {
    return User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'not found'})
            }

            user.update(req.body).then(user => {
                return res.status(200).json({
                    data: user
                });
            })
            
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

/**
 * Handle user delete requests
 * 
 * @param req
 * @param res
 * @param next
 * @return response
 */
const destroy = (req: Request, res: Response, next: NextFunction) => {
    return User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'not found'})
            }

            return user.destroy()
                .then(user => res.status(204).send())
                .catch(error => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
            
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

export default { index, create, read, update, destroy };