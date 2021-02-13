const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// const home = require(__dirname + "/controllers/home_controller")
const user = require(__dirname + "/controllers/users_controller");
const task = require(__dirname + "/controllers/tasks_controller");

port = process.env.PORT || "6996";

app.listen(port)
app.use(bodyParser.json())

// HOME
// app.get("/", user.index);

// USERS
app.get("/users", user.show);
app.get("/users/:id", user.show);
app.post("/users", user.create);
app.patch("/users/:id", user.update);
app.delete("/users/:id", user.destroy);

// TASKS
app.get("/tasks", task.show);
app.get("/tasks/:id", task.show);
app.post("/tasks", task.create);
app.patch("/tasks/:id", task.update);
app.delete("/tasks/:id", task.destroy);