'use strict';

import IUser from '../interfaces/user';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    set: (value: String) => bcrypt.hashSync(value, 10)
  }
}, {
  timestamps: true
});

export default model<IUser>('User', UserSchema);

// var mongoose = require('mongoose'),
//   bcrypt = require('bcrypt'),
//   Schema = mongoose.Schema;
//
// /**
//  * User Schema
//  */
// var UserSchema = new Schema({
//   fullName: {
//     type: String,
//     trim: true,
//     required: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     required: true
//   },
//   hash_password: {
//     type: String
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   }
// });
//
// UserSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.hash_password);
// };
//
// mongoose.model('User', UserSchema);