const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const roles = require("../models/roles");
const User = require("./../models/user");
const Roles = require("./../models/roles");

class LoginController {
  constructor() {
    this.login = (req, res) => {
      try {        
        this.req = req;
        this.res = res;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).send(errors);
        } else {
          const { email, password } = req.body;          
          this.checkData(email, password);
        }
      } catch (err) {
        console.log(err);
        res.status(422).send(err);
      }
    };


    this.checkData = async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if(user){        
          let password_is_true = await bcrypt.compare(password, user.password);
          if(password_is_true){
            this.res.send({name: password_is_true, p: user.password});
          }
          else{
            let error = [{param: 'email', msg: 'Email or password is invalid'}];
            this.res.status(422).send({errors: error});
          }          
      }
      else{
          let error = [{param: 'email', msg: 'Email or password is invalid'}];
          this.res.status(422).send({errors: error});
      }
    };
  }
}

const login_controler = new LoginController();

module.exports = login_controler;
