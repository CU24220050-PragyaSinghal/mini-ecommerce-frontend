const express = require('express');
const cors = require('cors');
const { add } = require('./calc');

const app = express();

// Q7: CORS enable karna local development ke liye
app.use(cors());
app.use(express.json());

// In-memory array for Books
let books = [
    { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
    { id: 2, title: '1984', author: 'George Orwell' }
];

// Q3(a): Custom middleware 'requireAuth'
const requireAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== 'secret123') {
        return res.status(401).json({ error: '401 Unauthorized' });
    }
    next();
};

// Q2 check test log
console.log("Testing calc.js add(4, 5):", add(4, 5));

// Q4: GET /api/books (List all books)
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Q3(b) & Q4: POST /api/books (Create book with Auth, status 201)
app.post('/api/books', requireAuth, (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Q4 & Q5: GET /api/books/:id (Fixed crash bug with 404 response)
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

// Q4: DELETE /api/books/:id (Delete book)
app.delete('/api/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const deleted = books.splice(index, 1);
    res.json({ message: 'Deleted successfully', deleted });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});