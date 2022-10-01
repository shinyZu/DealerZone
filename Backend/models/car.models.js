const mongoose = require("mongoose");
const validator = require("validator");

// Creating of a schema in "dealer_zone" database
const carSchema = new mongoose.Schema({
  reg_no: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: String,
    required: true,
  },

  details: {
    type: Text,
    required: true,
  },
});

// export editorSchema as a model
module.exports = mongoose.model("Car", carSchema);
