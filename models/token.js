const Sequelize = require('sequelize');
const sequelize = require('./../utils/database');

const token = sequelize.define('Token', {
    user: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false,
    },

    refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = token;