'use strict';

import { Schema, model, connect } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: String
});

export default model<User>('User', schema);

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