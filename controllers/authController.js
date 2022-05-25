const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("./../models/user");
const tokenService = require("./../services/tokenService");
const helperService = require("./../services/helperService");
const loginService = require("./../services/loginService");

class LoginController {
  constructor() {
    this.login = async (req, res) => {
      try {
        this.req = req;
        this.res = res;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).send(errors);
        } else {
          const { email, password } = req.body;          
          await loginService
            .checkData(email, password)
            .then((data) => {
              res.cookie('refresh_token', data.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly:true})
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
              res.status(422).send({errors: err})
            });
        }
      } catch (err) {        
        res.status(422).send(err);
      }
    };

    this.logout = (req, res) => {
      const {refresh_token} = req.cookies;
      res.clearCookie('refresh_token');
      const deleted_token = tokenService.removeRefreshToken(refresh_token);
      res.status(200).send({data: deleted_token})
    }
  }

  // static login(){console.log(888);}
  // static logout(){console.log(888);}
}

const login_controler = new LoginController();

module.exports = login_controler;
