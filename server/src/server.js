const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");

app.get("/", async (req, res) => {
  const data = await db.select("*").from("user");
  console.log(data);
  res.send(data);
});
app.listen(3000, () => console.log("Running"));
