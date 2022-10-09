const express = require("express");
const app = express();
const router = express.Router();

const User = require("../models/user.models");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    res.json(user);
  });
});

router.post("/", async (req, res) => {
  const body = req.body;
  const user = new User({
    nic_no: body.nic_no,
    email: body.email,
    password: body.password,
    contact_no: body.contact_no,
  });

  user.save((err, result) => {
    // if any error occured while saving
    if (err) {
      if (err.errors) {
        return res.status(500).json({ message: err.message.split(":")[2] });
      }

      if (err.keyPattern.contact_no == 1) {
        return res.status(404).json({ message: "Duplicate Contact No!" });
      } else if (err.keyPattern.email == 1) {
        return res
          .status(404)
          .json({ message: "An User with this Email already exist!" });
      } else if (err.keyPattern.nic_no == 1) {
        return res.status(404).json({ message: "Duplicate NIC No!" });
      } else if (!result) {
        return (
          res
            .status(404)
            // .json({ message: "Couldn't save the User. Please Try Again!" });
            .json({ message: "Invalid Password. Please Try Again!" })
        );
      } else if (result) {
        res.json(result);
      }
    }
    res.status(201).json({ message: "User Saved Succesfully!!!" });
  });
});

router.put("/:id", async (req, res) => {
  const body = req.body;
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (!user) {
      return res.status(404).json({ message: "No such User!" });
    }
    user.nic_no = body.nic_no;
    user.email = body.email;
    user.password = body.password;
    user.contact_no = body.contact_no;

    user.save((err2, result) => {
      if (err2) {
        return res.status(500).json({ message: err2.message.split(":")[2] });
      }
      if (!result) {
        return res.status(404).json({ message: "No such User!" });
      }
      res.status(200).json({ message: "User Updated Successfully!!!" });
    });
  });
});

router.delete("/:id", async (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    user.remove((err2, result) => {
      if (err2) {
        return res.status(500).json({ message: err2 });
      }
      if (!result) {
        return res.status(404).json({ message: "Error while deleting User!" });
      }
    });
    res.status(200).json({ message: "User Deleted Succesfully!!!" });
  });
});

module.exports = router;
