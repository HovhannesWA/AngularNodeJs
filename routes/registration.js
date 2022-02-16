const { Router } = require("express");
const router = Router();
const validators = require("./../validators/registrationValidators");
const RegistrationController = require('./../controllers/registrationController');

router.post("/", validators, RegistrationController.checkRegistrationData);

module.exports = router;
