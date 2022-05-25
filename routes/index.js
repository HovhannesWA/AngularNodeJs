const { Router } = require("express");
const router = Router();

//Routes
const auth = require("./auth");
const registration = require('./registration');
const statistics = require("./statistics");
const testing = require('./testing');

//Middlewares
const auth_middleware = require("./../middlewares/auth-middleware");


router.use('/api/auth', auth);
router.use('/api/registration', registration);
router.use('/api/getStats',auth_middleware, statistics);
router.use('/api/testing', testing);

module.exports = router;
