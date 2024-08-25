const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// Fetch single product by ID
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});



// Add new product
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, countInStock, imageUrl } = req.body;

  const product = new Product({
    name,
    description,
    price,
    countInStock,
    imageUrl,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

module.exports = { getProductById, addProduct, getProducts };
