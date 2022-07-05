const express = require("express");
const getCategories = require("./controllers/controller")
const handleNotFound = require("./controllers/controllers.errors")

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.use("*", handleNotFound);

module.exports = app;