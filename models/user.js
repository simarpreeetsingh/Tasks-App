const mongoose = require("mongoose");
const validator = require("validator");
const Task = require(__dirname + "/task")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate (inp) {
      if(!validator.isEmail(inp))
        throw new Error("Invalid format!")
    }
  },
  password: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    validate(inp) {
      if (inp < 1)
        throw new Error("Please enter an age greater than 1.")
    }
  },
  phone_number: {
    type: String
    // min_length: 10
  },
  friends: {
    type: Array
  }
}, { timestamps: true });

schema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "user"
})

schema.pre("remove", async function (next) {
  await Task.deleteMany({ user: this._id });
  next();
})

const User = mongoose.model("User", schema);

module.exports = User;