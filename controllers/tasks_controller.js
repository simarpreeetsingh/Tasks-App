const Task = require("../models/task");

const index = function (req, res) {
  Task.find({})
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
  Task.findOne({ _id: `${req.params.id}` })
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
  task = new Task(req.body)
  task.save()
  .then(doc => {
    res.status(200).end(JSON.stringify(doc))
  })
  .catch(err => {
    res.status(400).end(JSON.stringify(err))
  })
}

const update = function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  .then(doc => {
    res.status(200).end(JSON.stringify(doc))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err));
  })
}

const destroy = function (req, res) {
  Task.findOneAndDelete({ _id: req.params.id })
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