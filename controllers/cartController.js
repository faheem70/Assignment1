const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Fetch cart
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id).populate('items.product');
    if (cart) {
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

// Add item to cart
const addItemToCart = asyncHandler(async (req, res) => {
    const { cartId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    let cart = await Cart.findById(cartId);
    if (!cart) {
        cart = new Cart({ items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
});

// Remove item from cart
const removeItemFromCart = asyncHandler(async (req, res) => {
    const { cartId, productId } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
});

module.exports = { getCart, addItemToCart, removeItemFromCart };
