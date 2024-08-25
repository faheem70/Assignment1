// routes/authRoutes.js
const express = require('express');
const { signUp, login, getUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/:id', authMiddleware, getUserDetails);

module.exports = router;
