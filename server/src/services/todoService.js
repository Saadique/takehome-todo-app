const HttpError = require('../errors/HttpError');
const todoRepository = require('../repositories/todoRepository');

async function listTodos() {
  return todoRepository.listTodos();
}

async function createTodo({ title, description }) {
  return todoRepository.createTodo({ title, description });
}

async function updateTodo(id, { title, description }) {
  const updatedTodo = await todoRepository.updateTodoById(id, { title, description });

  if (!updatedTodo) {
    throw new HttpError(404, 'Todo not found');
  }

  return updatedTodo;
}

async function markAsDone(id) {
  const todo = await todoRepository.findTodoById(id);

  if (!todo) {
    throw new HttpError(404, 'Todo not found');
  }

  todo.done = !todo.done;
  await todo.save();

  return todo;
}

async function deleteTodo(id) {
  const deletedTodo = await todoRepository.deleteTodoById(id);

  if (!deletedTodo) {
    throw new HttpError(404, 'Todo not found');
  }
}

module.exports = {
  listTodos,
  createTodo,
  updateTodo,
  markAsDone,
  deleteTodo,
};
