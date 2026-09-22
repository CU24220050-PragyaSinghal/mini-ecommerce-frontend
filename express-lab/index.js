// ==========================================
// Part I: Environment Config (dotenv)
// ==========================================
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// ==========================================
// 11. Custom Global Logger Middleware
// ==========================================
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};
app.use(requestLogger);

// ==========================================
// 14. Enable JSON and URL-encoded body parsers
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Part I: Serve Static Files (public folder)
// ==========================================
app.use(express.static('public'));

// ==========================================
// Part F: Import Modular Routers
// ==========================================
const studentsRouter = require('./routes/students');
const booksRouter = require('./routes/books');

// ==========================================
// Part F: Mount Routers under /api prefixes
// ==========================================
app.use('/api/students', studentsRouter);
app.use('/api/books', booksRouter);

// ==========================================
// Part A & B: Basic Server & Routing
// ==========================================

// GET / (Part A)
app.get('/', (req, res) => {
  res.send('Express Lab Running');
});

// 5. GET /about
app.get('/about', (req, res) => {
  res.json({
    name: 'Your Name',
    rollNumber: '123456'
  });
});

// 6. GET /courses
app.get('/courses', (req, res) => {
  res.json(['Full Stack Web Development', 'Data Structures', 'Database Management']);
});

// 7. POST /echo
app.post('/echo', (req, res) => {
  res.json(req.body);
});

// ==========================================
// Part C: Route Parameters & Query Strings
// ==========================================

// 9. GET /search
app.get('/search', (req, res) => {
  const { name, age } = req.query;
  res.json({ name, age });
});

// 10. GET /products/:category/:id
app.get('/products/:category/:id', (req, res) => {
  const { category, id } = req.params;
  res.json({ category, id });
});

// ==========================================
// Part D: Middleware & Protected Routes
// ==========================================

// 12. API Key Checker Middleware for /admin routes
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== 'my-secret-key') {
    return res.status(403).json({ error: '403 Forbidden: Missing or invalid x-api-key' });
  }
  next();
};

// Apply apiKeyAuth only to routes starting with /admin
app.use('/admin', apiKeyAuth);

// 13. Protected Route
app.get('/admin/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

// ==========================================
// Part E: Working with JSON & Forms
// ==========================================

// 15. POST /register (JSON body)
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json({ message: `Successfully registered user: ${name}`, email });
});

// 16. POST /contact (URL-encoded form submission)
app.post('/contact', (req, res) => {
  console.log('Form Submission:', req.body);
  res.send('Thank you for contacting us!');
});

// ==========================================
// Part H: Error Handling Middleware
// (Yeh saare routes ke baad aur app.listen se pehle hone chahiye)
// ==========================================

// 22. 404 Unmatched Route Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// 23. Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error"
  });
});

// ==========================================
// Start Server (Using process.env.PORT)
// ==========================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});