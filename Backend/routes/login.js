const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const router = express.Router();

const User = require("../models/user.models");

router.post("/", cors(), async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
    console.log("empty inputs");
    return res
      .status(404)
      .json({ message: "Please fill the required fields!" });
  }

  User.find({ email: email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user.length != 0) {
      console.log(user[0]._id);
      if (user[0].email === email && user[0].password === password) {
        return res.status(200).send(user[0]._id);
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
