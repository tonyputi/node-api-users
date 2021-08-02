
'use strict';

import userModel from '../models/userModel';

export default {
  index(req, res) {
      var users = userModel.find({});
      console.log(users);
      res.json({})
  },
  create(req, res) {
    var user = new userModel(req.body);
    user.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
  },
  read(req, res) {
    var user = new userModel();
    user.findById('61084b23fbcba000c1031265');
    return res.json(user);
  },
  update(req, res) {

  },
  delete(req, res) {

  }
}

// export.create = function(req, res) {
//   return res.json(req.body)
// }

// var mongoose = require('mongoose'),
//   jwt = require('jsonwebtoken'),
//   bcrypt = require('bcrypt'),
//   User = mongoose.model('User');
//
// exports.register = function(req, res) {
//   var newUser = new User(req.body);
//   newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
//   newUser.save(function(err, user) {
//     if (err) {
//       return res.status(400).send({
//         message: err
//       });
//     } else {
//       user.hash_password = undefined;
//       return res.json(user);
//     }
//   });
// };
//
// exports.sign_in = function(req, res) {
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {
//     if (err) throw err;
//     if (!user || !user.comparePassword(req.body.password)) {
//       return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
//     }
//     return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
//   });
// };
//
// exports.loginRequired = function(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//
//     return res.status(401).json({ message: 'Unauthorized user!!' });
//   }
// };
//
// exports.profile = function(req, res, next) {
//   if (req.user) {
//     res.send(req.user);
//     next();
//   }
//   else {
//    return res.status(401).json({ message: 'Invalid token' });
//   }
// };