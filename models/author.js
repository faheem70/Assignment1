// models/author.js

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    profilePicture: { type: String }, 
    socialLinks: {
        twitter: { type: String },
        linkedin: { type: String },
        github: { type: String }
    }
});

module.exports = mongoose.model('Author', authorSchema);