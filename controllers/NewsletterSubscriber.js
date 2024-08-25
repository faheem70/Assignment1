// controllers/newsletterController.js
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

// Controller to handle subscribing to the newsletter
const subscribeToNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if the email is already subscribed
        const existingSubscriber = await NewsletterSubscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email is already subscribed' });
        }

        // Create a new subscriber
        const newSubscriber = new NewsletterSubscriber({ email });
        await newSubscriber.save();

        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    subscribeToNewsletter
};
