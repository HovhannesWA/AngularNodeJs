const { Router } = require("express");
const router = Router();

//Routes
const login = require("./login");
const registration = require('./registration');


router.use("/api/login", login);
router.use('/api/registration', registration);

module.exports = router;
