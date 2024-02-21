const express = require("express");
const app = express();
const todos = require("../controllers/todos.controller");

app.get("/collection/:id", todos.getAllTodosByCollection);
app.post("/", todos.createTodos);
app.get("/:id", todos.getTodosById);
app.put("/:id", todos.updateTodos);
app.patch("/:id", todos.updateTodosIsCompleted);
app.delete("/:id", todos.deleteTodos);
app.delete("/some/:id", todos.deleteTodosSome);

module.exports = app;
