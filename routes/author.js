// routes/authors.js
const express = require('express');
const router = express.Router();
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/Author');

// Get all authors
router.get('/', getAllAuthors);

// Get a specific author by ID
router.get('/:id', getAuthorById);

// Create a new author
router.post('/', createAuthor);

// Update an author
router.put('/:id', updateAuthor);

// Delete an author
router.delete('/:id', deleteAuthor);

module.exports = router;
