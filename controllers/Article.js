const mongoose = require("mongoose");
const Article = require("../models/article");
const Author = require("../models/author");

// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate("author", "name");
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific article by ID
const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate(
            "author",
            "name"
        );
        if (article) res.json(article);
        else res.status(404).json({ message: "Article not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new article
const createArticle = async (req, res) => {
    const { title, content, author, categories, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(author)) {
        return res.status(400).json({ message: "Invalid author ID" });
    }

    try {
        const existingAuthor = await Author.findById(author);
        if (!existingAuthor) {
            return res.status(400).json({ message: "Author not found" });
        }

        const article = new Article({ title, content, author, categories, tags });
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an article
const updateArticle = async (req, res) => {
    const { title, content, author, categories, tags } = req.body;

    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { title, content, author, categories, tags },
            { new: true }
        ).populate("author", "name");

        if (article) res.json(article);
        else res.status(404).json({ message: "Article not found" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an article
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (article) res.json({ message: "Article deleted" });
        else res.status(404).json({ message: "Article not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getArticlesByFilter = async (req, res) => {
    const { category, tag } = req.query;
    try {
        let query = {};
        if (category) query.categories = category;
        if (tag) query.tags = tag;

        const articles = await Article.find(query).populate("author", "name");
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRelatedArticles = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the current article to get its categories or tags
        const currentArticle = await Article.findById(id);
        if (!currentArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Find articles with matching categories or tags
        const relatedArticles = await Article.find({
            _id: { $ne: id },
            $or: [
                { categories: { $in: currentArticle.categories } },
                { tags: { $in: currentArticle.tags } }
            ]
        }).populate("author", "name").limit(5); // Limit the number of related articles

        res.json(relatedArticles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addComment = async (req, res) => {
    const { content, author } = req.body;
    const { articleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(author)) {
        return res.status(400).json({ message: "Invalid author ID" });
    }

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        article.comments.push({ content, author });
        await article.save();

        res.status(201).json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all comments for an article
const getCommentsByArticleId = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId).populate("comments.author", "name");
        if (article) res.json(article.comments);
        else res.status(404).json({ message: "Article not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete a comment
const deleteComment = async (req, res) => {
    const { articleId, commentId } = req.params;

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        const commentIndex = article.comments.findIndex(c => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        article.comments.splice(commentIndex, 1);
        await article.save();

        res.json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
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
    
};
