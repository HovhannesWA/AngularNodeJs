const { Router } = require("express");
const router = Router();
const login = require("./login");


router.use("/api/login", login);

module.exports = router;
