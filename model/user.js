const Sequelize = require('sequelize');
const connectDB = require('../db/connect')

const User = connectDB.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
},{timestamps :true});

module.exports = User