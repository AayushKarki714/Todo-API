const {
  getAllTodos,
  saveTodo,
  existsTodoWithId,
  deleteTodoById,
  completeTodoById,
} = require("../models/todo.model");

async function httpGetAllTodos(req, res) {
  const todo = await getAllTodos();
  return res.json(todo);
}

async function httpPostTodo(req, res) {
  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(400).json({
      error: "Missing Required Fields",
    });
  }
  await saveTodo({ title, description });
  return res.status(201).json({ title, description });
}

async function httpDeleteTodo(req, res) {
  const todoId = Number(req.params.id);
  const exists = await existsTodoWithId(todoId);
  if (!exists) {
    return res.status(400).json({
      error: "Todo With the ID not Found",
    });
  }
  const deleted = await deleteTodoById(todoId);

  if (!deleted) {
    return res.status(400).json({
      error: "Todo not deleted",
    });
  }
  return res.status(200).json({ ok: true });
}

async function httpCompleteTodo(req, res) {
  const todoId = Number(req.params.id);
  const exists = await existsTodoWithId(todoId);
  if (!exists) {
    return res.status(400).json({
      error: "Todo With the ID not Found",
    });
  }
  const deleted = await completeTodoById(todoId);
  if (!deleted) {
    return res.status(400).json({
      error: "Todo not Completed",
    });
  }
  return res.status(200).json({ ok: true });
}

module.exports = {
  httpCompleteTodo,
  httpDeleteTodo,
  httpGetAllTodos,
  httpPostTodo,
};
