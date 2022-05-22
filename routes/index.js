const { Router } = require("express");
const router = Router();

//Routes
const login = require("./login");
const registration = require('./registration');
const testing = require('./testing');


router.use('/api/login', login);
router.use('/api/registration', registration);
router.use('/api/testing', testing);

module.exports = router;
