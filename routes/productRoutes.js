const express = require('express');
const { getProductById, addProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/:id', getProductById);
router.post('/add', addProduct);
router.route('/').get(getProducts);

module.exports = router;
