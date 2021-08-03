'use strict';

import { Document } from 'mongoose';

export default interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    checkPassword(password: string): boolean;
}