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
  make_public: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: String,
    required: true
  }
});
const Task = mongoose.model("Task", schema);

module.exports = Task;