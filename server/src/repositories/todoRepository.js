const Todo = require('../models/Todo');

function listTodos() {
  return Todo.find().sort({ createdAt: -1 });
}

function createTodo(data) {
  return Todo.create(data);
}

function findTodoById(id) {
  return Todo.findById(id);
}

function updateTodoById(id, updates) {
  return Todo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

function deleteTodoById(id) {
  return Todo.findByIdAndDelete(id);
}

module.exports = {
  listTodos,
  createTodo,
  findTodoById,
  updateTodoById,
  deleteTodoById,
};
