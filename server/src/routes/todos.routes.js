const express = require("express");
const app = express();
const todos = require("../controllers/todos.controller");

app.get("/", todos.getAllTodos);
app.post("/", todos.createTodos);
// app.get("/:id", todos.getTodosById);
// app.put("/:id", todos.updateTodos);
// app.delete("/:id", todos.deleteTodos);
// app.delete("/some/:id", todos.deleteTodosSome);

module.exports = app;
