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

module.exports = router;