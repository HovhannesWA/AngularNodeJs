const { body } = require("express-validator");
const User = require('./../models/user');

const validators = [
    //First Name
    body('first_name').notEmpty().withMessage('Field is required'),
    body('first_name').isLength({min: 4}).withMessage('Required at last 4 letters'),
    //Last Name
    body('last_name').notEmpty().withMessage('Field is required'),
    body('last_name').isLength({min: 4}).withMessage('Required at last 4 letters'),
    //E-mail
    body('email').notEmpty().withMessage('Field is required'),
    body('email').isEmail().withMessage('Invalid E-mail format'),
    body("email").custom(async(email) => {
      const condidate = await User.findOne({ where: { email } });
      if (condidate) {
          throw new Error('E-mail already exists');
      } else {
        return true;
      }
    }),
    //Password
    body('password').notEmpty().withMessage('Field is required'),
    body('password').isLength({min: 8}).withMessage('Required at last 8 chars'),
    //Password
    body('confirm_password').notEmpty().withMessage('Field is required'),
    body('confirm_password').custom((value, {req}) => {
      const password = req.body.password
      if(value !== password){
        throw new Error('Passwords must be same')
      }
      else{
          return true;
      }
    })
]

module.exports = validators;