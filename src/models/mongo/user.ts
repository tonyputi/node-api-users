'use strict';

import IUser from '../../interfaces/user';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

/** Mongodb user model */
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
    select: false,
    set: (value: string) => bcrypt.hashSync(value, 10)
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

/**
 * Check if the give password is matching the one present on the user model
 * @param {string} password - the password that must be checked
 * @return {boolean}
 */
UserSchema.method('checkPassword', async function (password: string) : Promise<boolean> {
  return await bcrypt.compareSync(password, this.get('password'));
});

export default model<IUser>('User', UserSchema);