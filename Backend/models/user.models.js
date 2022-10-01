const mongoose = require("mongoose");
const validator = require("validator");

// Creating of a schema in "dealer_zone" database
const userSchema = new mongoose.Schema({
  nic_no: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /[0-9]{9}[v]|[0-9]{12}/.test(val);
      },
      message: (val) => "Invalid NIC No!",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /[A-z|0-9]{4,}@(gmail)(.com|.lk)/.test(val);
      },
      message: (val) => "Invalid Email!",
    },
  },

  password: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /[a-z0-9]{8}/.test(val);
      },
      message: (val) => "Invalid Password!",
    },
    // minLength: [8, "Password should be at least 8 characters"],
    // pattern: "^[a-z0-9]{8}$",
  },

  contact_no: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return val.toString().length === 9;
      },
      message: "Invalid Phone No!",
    },
  },
});

// export editorSchema as a model
module.exports = mongoose.model("User", userSchema);
