'use strict';

import { Document } from 'mongoose';

/**
 * User mongoose interface
 */
export default interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    checkPassword: (password: string) => Promise<boolean>;
}