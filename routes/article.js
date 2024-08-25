const express = require('express');
const router = express.Router();
const {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticlesByFilter,
    addComment,
    getCommentsByArticleId,
    deleteComment,
    getRelatedArticles
} = require('../controllers/Article');

// Get all articles
router.get('/', getAllArticles);

// Get a specific article by ID
router.get('/:id', getArticleById);

// Create a new article
router.post('/', createArticle);

// Update an article
router.put('/:id', updateArticle);

// Delete an article
router.delete('/:id', deleteArticle);

//filterout with category
router.get('/filter', getArticlesByFilter);

router.post("/:articleId/comments",addComment );
router.get("/:articleId/comments", getCommentsByArticleId);
router.delete("/:articleId/comments/:commentId", deleteComment);

router.get('/:id/related', getRelatedArticles);

module.exports = router;
