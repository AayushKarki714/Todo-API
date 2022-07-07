const express = require("express");

const todoRouter = require("./routes/todo.router");

const app = express();

app.use(express.json());
app.use("/todo", todoRouter);

module.exports = app;
