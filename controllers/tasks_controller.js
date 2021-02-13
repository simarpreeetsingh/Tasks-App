const Task = require("../models/task");

const index = function (req, res) {
  console.log(req.query, req.params);
  res.end("Ok Done index");
}

const show = function (req, res) {
  console.log(req.query, req.params, res);
  res.end("Ok Done show");
}

const create = function (req, res) {
  console.log(req.query, req.params, req.body);
  Task = new Task(req.body);
  task.save(function (err) {
    if (err)
      console.log(err)
      res.status(400).end("err");
    res.status(200).end("user.toString()")
  })
  // res.end("Ok Done create");
}

const update = function (req, res) {
  console.log(req.query, req.params);
  res.end("Ok Done ud");
}

const destroy = function (req, res) {
  console.log(req.query, req.params);
  res.end("Ok Done destroy");
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}