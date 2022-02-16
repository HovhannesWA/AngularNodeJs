const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("./../models/user");

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
        let hash_password = bcrypt.hashSync(password, +process.env.USER_PASSWORD_HASH_SALT);
        let new_user = await User.create({
          first_name,
          last_name,
          email,
          role: 7,
          password: hash_password,
        });

        res.status(200).send(new_user);
      }
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  },
};

module.exports = RegistrationController;
