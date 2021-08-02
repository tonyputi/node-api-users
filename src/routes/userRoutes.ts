'use strict';

import express from "express";
import userController from '../controllers/userController';
import userModel from '../models/userModel';

const router = express.Router()

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// router.post('/', function(req, res) {
//     var user = new userModel(req.body);
//     user.save(function(err, user) {
//         if (err) {
//             return res.status(400).send({
//                 message: err
//             });
//         } else {
//             user.password = undefined;
//             return res.json(user);
//         }
//         console.log(err, user);
//     });
//     res.json(user);
// });

router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:id', userController.read);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;

// module.exports = function(app) {
    // app.route('/register').get(userController.register)

    // var userHandlers = require('../controllers/userController.ts');
    // // todoList Routes
    // app.route('/tasks')
    //     .post(userHandlers.loginRequired, userHandlers.profile);
    // app.route('/auth/register')
    //     .post(userHandlers.register);
    // app.route('/auth/sign_in')
    //     .post(userHandlers.sign_in);
// };