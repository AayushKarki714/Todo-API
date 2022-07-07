const todoDatabase = require("./todo.mongo");
const DEFAULT_TODO_ID = 100;

async function getAllTodos() {
  return todoDatabase.find({});
}

async function getLatestTodoId() {
  const latestTodo = await todoDatabase.findOne().sort("-todoId");
  if (!latestTodo) {
    return DEFAULT_TODO_ID;
  }
  return latestTodo.todoId;
}

async function saveTodo(todo) {
  try {
    const newTodoId = (await getLatestTodoId()) + 1;
    const newTodo = Object.assign(todo, {
      todoId: newTodoId,
      completed: false,
      deleted: false,
    });
    await todoDatabase.findOneAndUpdate({ todoId: newTodo.todoId }, newTodo, {
      upsert: true,
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function existsTodoWithId(todoId) {
  return await todoDatabase.findOne({
    todoId: todoId,
  });
}

async function deleteTodoById(todoId) {
  const todo = await todoDatabase.updateOne(
    {
      todoId: todoId,
    },
    {
      deleted: true,
    }
  );
  return todo.modifiedCount === 1 && todo.matchedCount === 1;
}

async function completeTodoById(todoId) {
  const todo = await todoDatabase.updateOne(
    {
      todoId: todoId,
    },
    {
      completed: true,
    }
  );
  return todo.modifiedCount === 1 && todo.matchedCount === 1;
}

module.exports = {
  getAllTodos,
  getLatestTodoId,
  saveTodo,
  existsTodoWithId,
  deleteTodoById,
  completeTodoById,
};
