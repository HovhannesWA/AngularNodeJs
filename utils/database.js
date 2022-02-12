const { Sequelize } = require('sequelize');
require("dotenv").config();

const DB_NAME = process.env.DB_NAMME;
const USERNAME = process.env.DB_USERANME;
const PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;