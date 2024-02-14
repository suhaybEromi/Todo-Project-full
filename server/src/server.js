const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
require("dotenv").config();
const routes = require("./routes/routes");
app.use(routes);

app.listen(3000, () => console.log("Running"));
