import { Sequelize, DataTypes } from 'sequelize';
import config from "../../config/config";

const sequelize = new Sequelize(config.postgres.uri);

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    
});

export default User;