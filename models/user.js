const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone_number: {
    type: String
    // min_length: 10
  }
});

// console.log(mongoose.connection, "*******************")

const User = mongoose.model("User", schema);

module.exports = User;