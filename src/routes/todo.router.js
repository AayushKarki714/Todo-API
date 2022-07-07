const express = require("express");
const {
  httpGetAllTodos,
  httpPostTodo,
  httpCompleteTodo,
  httpDeleteTodo,
} = require("./todo.controller");

const todoRouter = express.Router();

todoRouter.get("/", httpGetAllTodos);
todoRouter.post("/", httpPostTodo);
todoRouter.put("/:id", httpCompleteTodo);
todoRouter.delete("/:id", httpDeleteTodo);

module.exports = todoRouter;
