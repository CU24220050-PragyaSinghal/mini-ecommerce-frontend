// routes/books.js
const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: 'Node.js Guide' },
  { id: 2, title: 'Express Fundamentals' }
];

// GET /api/books (All books)
router.get('/', (req, res) => {
  res.json(books);
});

// GET /api/books/:id (Single book)
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /api/books (Add a book)
router.post('/', (req, res) => {
  const newBook = { 
    id: books.length + 1, 
    title: req.body.title 
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;