const User = require("../models/user");

const User = require("../../models/user")

function create (data) {
  user = new User(data)
  user.save()
  .then()
  .catch()
}

function update (data) {
  
}