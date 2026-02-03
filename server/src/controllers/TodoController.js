const todoService = require('../services/todoService');

async function listTodos(_request, response) {
  const todos = await todoService.listTodos();
  return response.json(todos);
}

async function createTodo(request, response) {
  const { title, description } = request.body;
  const todo = await todoService.createTodo({ title, description });

  return response.status(201).json(todo);
}

async function updateTodo(request, response) {
  const { id } = request.params;
  const { title, description } = request.body;

  const updatedTodo = await todoService.updateTodo(id, { title, description });

  return response.json(updatedTodo);
}

async function markAsDone(request, response) {
  const { id } = request.params;
  const updatedTodo = await todoService.markAsDone(id);
  
  return response.json(updatedTodo);
}

async function deleteTodo(request, response) {
  const { id } = request.params;
  await todoService.deleteTodo(id);

  return response.status(204).send();
}

module.exports = {
  listTodos,
  createTodo,
  updateTodo,
  markAsDone,
  deleteTodo,
};
