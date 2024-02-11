const express = require("express");
const app = express();
const controller = require("../controllers/collections.controller");

app.get("/", controller.getAllCollection);
app.post("/", controller.createCollection);
app.get("/:id", controller.getCollectionById);
app.put("/:id", controller.updateCollection);
app.delete("/:id", controller.deleteCollection);
app.delete("/some/:id", controller.deleteCollectionSome);

module.exports = app;
