const { body } = require("express-validator");

const validators = [
    //Email
    body('email').notEmpty().withMessage('Field is required'),
    body('email').isEmail().withMessage('Invalid E-mail format'),
    //Password
    body('password').notEmpty().withMessage('Field is required'),
    // body('password').isLength({min: 8}).withMessage('Required at last 8 chars')
]



module.exports = validators;