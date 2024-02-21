const express = require("express");
const app = express();
const controller = require("../controllers/auth.controller");

app.post("/login", controller.login);
app.post("/register", controller.register);

module.exports = app;
