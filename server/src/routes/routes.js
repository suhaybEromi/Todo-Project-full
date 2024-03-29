const express = require("express");
const app = express();
const prefix = process.env.API_PREFIX || "api";

// root
app.get("/", (req, res) => res.send("Todos BackEnd"));

// users
app.get(`/${prefix}/users`, async (req, res) => res.send("Welcome users"));

// collection
app.use(`/${prefix}/collections`, require("./collection.routes"));

// todos
app.use(`/${prefix}/todos`, require("./todos.routes"));

// auth
app.use(`/${prefix}/auth`, require("./auth.routes"));

// 404
app.use((req, res) =>
  res
    .status(404)
    .send({ status: 404, success: false, error: "Endpoint not found" }),
);

module.exports = app;
