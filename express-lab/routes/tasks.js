const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build REST API', completed: true }
];

// GET all
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET single with explicit 404 error passing via next(err)
router.get('/:id', (req, res, next) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    return next(error);
  }
  res.json(task);
});

// POST create
router.post('/', (req, res, next) => {
  if (!req.body.title) {
    const error = new Error('Title is required');
    error.status = 400;
    return next(error);
  }
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: req.body.title,
    completed: req.body.completed || false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update
router.put('/:id', (req, res, next) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    return next(error);
  }
  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  res.json(task);
});

// DELETE remove
router.delete('/:id', (req, res, next) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    const error = new Error('Task not found');
    error.status = 404;
    return next(error);
  }
  const deletedTask = tasks.splice(index, 1);
  res.json({ message: 'Task deleted successfully', deletedTask });
});

module.exports = router;