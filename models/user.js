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
  }
});
const User = mongoose.model("User", schema);

module.exports = User;