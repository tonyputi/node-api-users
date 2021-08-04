'use strict';

import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import config from "../../config/config";

const sequelize = new Sequelize(config.postgres.uri);

/** Postgres user model */
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            this.setDataValue('password', bcrypt.hashSync(value, 10))
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

/**
 * Check if the give password is matching the one present on the user model
 * @param {string} password - the password that must be checked
 * @return {boolean}
 */
User.prototype.checkPassword = function (password: string) : boolean {
    return bcrypt.compareSync(password, this.password);
}

export default User;