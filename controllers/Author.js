// controllers/authorController.js
const Author = require('../models/author');

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific author by ID
const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (author) res.json(author);
        else res.status(404).json({ message: 'Author not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new author
const createAuthor = async (req, res) => {
    const author = new Author(req.body);
    try {
        const newAuthor = await author.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an author
const updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (author) res.json(author);
        else res.status(404).json({ message: 'Author not found' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an author
const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (author) res.json({ message: 'Author deleted' });
        else res.status(404).json({ message: 'Author not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};