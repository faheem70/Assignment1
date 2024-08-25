// routes/newsletter.js
const express = require('express');
const router = express.Router();
const { subscribeToNewsletter } = require('../controllers/NewsletterSubscriber');

// Route to subscribe to the newsletter
router.post('/subscribe', subscribeToNewsletter);

module.exports = router;
