const Sequelize = require('sequelize');
const sequelize = require('./../utils/database');

const roles = sequelize.define('Roles', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = roles;