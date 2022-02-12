const { Router } = require("express");
const router = Router();

const User = require('./../models/user');

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const new_user = await User.create({
        first_name: username,
        last_name: username + '_last name',
        email: username + '@mail.com',
        role: 7,
        password: password        
    })
    res.status(201).send({new_user});    
  } catch (err) {
    res.status(422).send({ message: "Invalid data" });
    console.log(err);
  }
});

module.exports = router;
