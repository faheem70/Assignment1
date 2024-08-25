// models/NewsletterSubscriber.js
const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', newsletterSchema);

module.exports = NewsletterSubscriber;
