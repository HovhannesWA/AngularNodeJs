const Sequelize = require('sequelize');
const sequelize = require('./../utils/database');


const user = sequelize.define('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    first_name: {        
        allowNull: false,
        type: Sequelize.STRING
    },
    last_name: {        
        allowNull: false,
        type: Sequelize.STRING
    },
    email: {        
        allowNull: false,
        type: Sequelize.STRING
    },
    email_is_confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    email_confirm_token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {        
        allowNull: false,
        type: Sequelize.STRING
    },
    image_url: {        
        allowNull: true,
        type: Sequelize.STRING
    },
    role: {        
        allowNull: false,
        type: Sequelize.INTEGER
    }
})

module.exports = user;