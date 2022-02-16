const { Router } = require("express");
const router = Router();
var jwt = require('jsonwebtoken');

const validators = require("./../validators/loginValidators");
const LoginController = require('./../controllers/loginController');

router.get("/", (req, res) => {
  try {
    res.send({ message: "Hello World" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", validators, LoginController.login);

function generateJwtToken(object){
  return jwt.sign({...object}, process.env.JWT_TOKEN_KEY, { expiresIn: '1h' });
}

module.exports = router;