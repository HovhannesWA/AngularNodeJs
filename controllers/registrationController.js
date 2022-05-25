const { validationResult } = require("express-validator");
const User = require("./../models/user");
const tokenService = require('./../services/tokenService');
const helperService = require('./../services/helperService');
const mailService = require('./../services/mailService');
const registrationService = require('./../services/registrationService');

const RegistrationController = {
  checkRegistrationData: async (req, res) => {    
    try {
      const { first_name, last_name, email, password } = req.body;
      const errors = validationResult(req);
      //if eny errors with request data
      if (!errors.isEmpty()) {
        res.status(422).send(errors);
        return;
      }

      //register
      else {        
        const new_user = await registrationService.registerUser({ first_name, last_name, email, password })

        const {refresh_token} = tokenService.generateToken(helperService.userDPO(new_user));
        await tokenService.saveToken(new_user.id,refresh_token);

        // mailService.sendEmailConfirmToken(new_user.email, refresh_token);

        res.status(200).send({user: new_user, refresh_token: refresh_token});
      }
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  },
};

module.exports = RegistrationController;
