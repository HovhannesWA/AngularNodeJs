const { Router } = require("express");
const router = Router();
var jwt = require('jsonwebtoken');

const validators = require("./../validators/loginValidators");
const AuthController = require('./../controllers/authController');


router.post("/login", validators, AuthController.login);
router.post("/logout", validators, AuthController.logout);

module.exports = router;