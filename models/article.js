const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    date: { type: Date, default: Date.now },
});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    categories: [{
        type: String,
        required: false
    }],
    tags: [{
        type: String,
        required: false
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [commentSchema],
});

module.exports = mongoose.model('Article', articleSchema);
