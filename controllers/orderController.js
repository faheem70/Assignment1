const Order = require('../models/orderModel');

const placeOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to place the order. Please try again.' });
    }
};

module.exports = {
    placeOrder,
};
