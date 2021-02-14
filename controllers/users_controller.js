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
  User.findOne({ _id: `${req.params.id}` })
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
      throw new Error(err)
    }
    else {
      res.status(200).end(JSON.stringify(user));
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

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}