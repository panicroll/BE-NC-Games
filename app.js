const express = require("express");
const {getCategories, getReview} = require("./controllers/controller")
const {handleNotFound, handleCustomErrors, handlePSQLErrors, handleServerErrors} = require("./errors")

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReview);

app.all("*", handleNotFound);

app.use(handleCustomErrors);

app.use(handlePSQLErrors);

app.use(handleServerErrors);

module.exports = app;