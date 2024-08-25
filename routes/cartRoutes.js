const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartModel');

// Get all cart items
router.get('/cart', async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate('productId');
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add an item to the cart
router.post('/cart/add', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Check if item already exists in cart
        let cartItem = await CartItem.findOne({ productId });

        if (cartItem) {
            // Update quantity if item exists
            cartItem.quantity += quantity;
        } else {
            // Create new cart item if not exists
            cartItem = new CartItem({ productId, quantity });
        }

        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove an item from the cart
router.delete('/cart/remove/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        const deletedItem = await CartItem.findByIdAndDelete(itemId);
        res.json({ message: 'Item removed from cart', deletedItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
