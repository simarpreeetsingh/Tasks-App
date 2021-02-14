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

const show = function (req, res) {
  User.findOne({ _id: req.params.id })
  .then(doc => {
    res.status(200).send(JSON.stringify({
      success: true,
      data: doc
    }))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err))
  })
}

const create = function (req, res) {
  user = new User(req.body);
  user.save(function (err) {
    if (err) {
      res.status(400).end(JSON.stringify(err));
    }
    else {
      res.status(201).end(JSON.stringify(user));
    }
  })
}

const update = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  .then(doc => {
    res.status(200).end(JSON.stringify(doc))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err));
  })
}

const destroy = function (req, res) {
  User.findOneAndDelete({ _id: req.params.id })
  .then(doc => {
    res.status(200).end(JSON.stringify(doc))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err));
  })
}

const login = async function (req, res) {
  user = await User.findOne({ name: req.body.name, password: req.body.password });
  if (user) {
    globalThis.userLoggedIn = user._id
    res.status(200).end(JSON.stringify(user))
  }
  else
    res.status(400).end(JSON.stringify({
      success: false,
      message: "User authentication failed!"
    }))
}

const logout = async function (req, res) {
  user = await User.findOne({ _id: globalThis.userLoggedIn });
  if (user) {
    globalThis.userLoggedIn = null
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