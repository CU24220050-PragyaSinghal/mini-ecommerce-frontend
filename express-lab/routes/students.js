// routes/students.js
const express = require('express');
const router = express.Router();

// Yeh route banega: GET /api/students/:id
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, message: "Student details from Router" });
});

module.exports = router;