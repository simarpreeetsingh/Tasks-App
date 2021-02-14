const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const home = require(__dirname + "/controllers/home_controller");
const user = require(__dirname + "/controllers/users_controller");
const task = require(__dirname + "/controllers/tasks_controller");

const dbName = "task-app";
const url = process.env.PORT || `mongodb://127.0.0.1:27017/${dbName}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(doc => {
  console.log("doc");
})


port = process.env.PORT || "6996";

app.use(bodyParser.json())

// HOME
// app.get("/", user.index);

// USERS
app.get("/users", user.index);
app.get("/users/:id", user.show);
app.post("/users", user.create);
app.patch("/users/:id", user.update);
app.delete("/users/:id", user.destroy);

// TASKS
app.get("/tasks", task.index);
app.get("/tasks/:id", task.show);
app.post("/tasks", task.create);
app.patch("/tasks/:id", task.update);
app.delete("/tasks/:id", task.destroy);

app.listen(port, () => console.log(`Listening on port ${port}...`))
