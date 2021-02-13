const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: String
    // min_length: 10
  }
});
const Task = mongoose.model("Task", schema);

module.exports = Task;