const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const routes = require("./routes/routes");
app.use(routes);

app.listen(3000, () => console.log("Running"));
