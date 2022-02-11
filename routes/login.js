const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.send({ message: "Hello World" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", (req, res) => {
  try {
    // const {password, username} = req.body;
    const { username, password } = req.body;
    if (username === "hovok" && password === "Admin123*") {
      res.send({ message: "hello from login route" });
    } else {
      res.status(422).send({ message: "Invalid data" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;