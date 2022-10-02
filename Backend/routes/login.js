const express = require("express");
const app = express();
const router = express.Router();

const User = require("../models/user.models");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email: email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user.length != 0) {
      if (user[0].email === email && user[0].password === password) {
        return res.status(200).json({ message: "Success" });
      } else {
        return res.status(404).json({ message: "Please check your Password!" });
      }
    }
    return res
      .status(404)
      .json({ message: "No account with the given Email!" });
  });
});

module.exports = router;
