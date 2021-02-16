const User = require("../models/user");

const index = function (req, res) {
  User.find({})
  .then(doc => {
    res.status(200).send(JSON.stringify({
      success: true,
      data: doc,
      total: doc.length
    }))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err))
  })
}

const show = async function (req, res) {
  user = await User.findOne({ _id: req.params.id });
  // console.log((await user.populate("tasks").execPopulate()).tasks)
  if (user)
    res.status(201).end(JSON.stringify({
      success: true,
      data: user
    }))
  else
    res.status(400).end(JSON.stringify({
      success: false,
      data: user,
      message: "User not found!"
    }))
}

const create = function (req, res) {
  if (global.current_user)
    res.status(400).end(JSON.stringify({
      success: false,
      message: "Please log out first!"
    }))
  user = new User(req.body);
  user.save(function (err) {
    if (err) {
      res.status(400).end(JSON.stringify(err));
    }
    else {
      global.current_user = user._id
      res.status(201).end(JSON.stringify(user));
    }
  })
}

const update = async function (req, res) {
  if (!global.current_user)
    res.status(400).end(JSON.stringify({
      success: false,
      message: "Please log in to continue."
    }))
  else if (global.current_user != req.params.id)
    res.status(400).end(JSON.stringify({
      success: false,
      message: "Invalid request."
    }))
  user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  if (user)
    res.status(200).end(JSON.stringify(user));
  else
    res.status(500).send(JSON.stringify(err));
}

const destroy = function (req, res) {
  User.findOneAndDelete({ _id: req.params.id })
  .then(doc => {
    res.status(200).end(JSON.stringify({
      success: true,
      message: "User successfully deleted!"
    }))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err));
  })
}

const login = async function (req, res) {
  if (global.current_user)
    res.status(400).end(JSON.stringify({
      success: false,
      message: "Please log out first!"
    }))
  user = await User.findOne({ name: req.body.name, password: req.body.password });
  if (user) {
    global.current_user = user._id
    res.status(200).end(JSON.stringify(user))
  }
  else
    res.status(400).end(JSON.stringify({
      success: false,
      message: "User authentication failed!"
    }))
}

const logout = async function (req, res) {
  user = await User.findOne({ _id: global.current_user });
  if (user) {
    global.current_user = null
    res.status(200).end(JSON.stringify({
      success: true,
      message: "Successfully logged out!"
    }))
  }
  else
    res.status(500).end(JSON.stringify({
      success: false,
      message: "Internal server error."
    }))
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  login,
  logout
}