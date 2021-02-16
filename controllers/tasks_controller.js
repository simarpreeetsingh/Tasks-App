const Task = require("../models/task");

const index = function (req, res) {
  if (!global.current_user)
    res.status(400).end(JSON.stringify({
      success: false,
      message: "Please log in to continue!"
    }))
  Task.find({ user: global.current_user })
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
  if (!global.current_user)
    res.status(400).end(JSON.stringify({
      success: false,
      message: "Please log in to continue!"
    }))
  const task = await Task.findOne({ _id: req.params.id, user: global.current_user })
  if (task)
  res.status(200).send(JSON.stringify({
    success: true,
    data: task
  }))
  else
    res.status(500).send(JSON.stringify(JSON.stringify({
      success: false,
      message: "No record found!"
    })))
}

const create = function (req, res) {
  if (!global.current_user)
    res.status(401).end(JSON.stringify({
      success: false,
      message: "Please log in to continue!"
    }))
  task = new Task(req.body)
  task.user = global.current_user
  task.save()
  .then(doc => {
    res.status(200).end(JSON.stringify(doc))
  })
  .catch(err => {
    res.status(400).end(JSON.stringify(err))
  })
}

const update = async function (req, res) {
  if (!global.current_user)
    res.status(400).end(JSON.stringify({
      success: false,
      message: "Please log in to continue!"
    }))
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: global.current_user }, req.body, { new: true })
  if (task)
    res.status(200).end(JSON.stringify({
      success: true,
      data: task
    }));
  else
    res.status(400).end(JSON.stringify({
      success: false,
      message: "No record found!"
    }));
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