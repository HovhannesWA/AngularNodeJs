const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const ststistics = sequelize.define('Statistics', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,       
        allowNull: false
    },

    test2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    test3: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    test4: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = ststistics;