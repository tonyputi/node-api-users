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
    index: true,
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

UserSchema.method('checkPassword', function (password: String) {
  return bcrypt.compareSync(password, this.password);
})

export default model<IUser>('User', UserSchema);