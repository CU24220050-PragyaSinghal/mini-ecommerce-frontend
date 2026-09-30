const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || 'default-key';

// Global Middlewares
app.use(cors());
app.use(express.json());

// 1. Custom Logger Middleware
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};
app.use(loggerMiddleware);

// 2. Auth-Check Middleware (Secures POST, PUT, DELETE)
const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid x-api-key header' });
    }
    next();
};

// In-Memory Task Data (At least 5 objects)
let tasks = [
    { id: 1, title: 'Learn Node.js and Express', completed: false },
    { id: 2, title: 'Build a REST API', completed: true },
    { id: 3, title: 'Configure CORS and Middlewares', completed: false },
    { id: 4, title: 'Connect Plain JS Client', completed: false },
    { id: 5, title: 'Build React Frontend Client', completed: false }
];

// --- CRUD ROUTES ---

// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// GET a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
    }
    res.json(task);
});

// POST a new task (Protected)
app.post('/api/tasks', authMiddleware, (req, res) => {
    const { title, completed } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Task title is required' });
    }
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        completed: completed || false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT (update) an existing task (Protected)
app.put('/api/tasks/:id', authMiddleware, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
    }
    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
});

// DELETE a task (Protected)
app.delete('/api/tasks/:id', authMiddleware, (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
    }
    const deletedTask = tasks.splice(index, 1)[0];
    res.json({ message: 'Task deleted successfully', deletedTask });
});

// --- ERROR HANDLING ---

// 404 Handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found - The requested endpoint does not exist' });
});

// Centralized Error-Handling Middleware (4 parameters)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});