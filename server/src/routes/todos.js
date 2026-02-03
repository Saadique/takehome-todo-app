const express = require('express');

const TodoController = require('../controllers/TodoController');
const validateObjectId = require('../middlewares/validateObjectId');
const handleRequest = require('../utils/requestHandler');

const router = express.Router();

router.get('/', handleRequest(TodoController.listTodos));

router.post('/', handleRequest(TodoController.createTodo));

router.put('/:id', validateObjectId('id'), handleRequest(TodoController.updateTodo));

router.patch('/:id/done', validateObjectId('id'), handleRequest(TodoController.markAsDone));

router.delete('/:id', validateObjectId('id'), handleRequest(TodoController.deleteTodo));

module.exports = router;
