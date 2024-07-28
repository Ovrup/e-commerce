const express = require('express');
const { getUserCart, addToCart, removeFromCart } = require('../controller/cart');
const { verifyUser } = require('../utils/verifyToken.js')

const router = express.Router();

router.get('/', verifyUser, getUserCart);
router.post('/addToCart/:id', verifyUser, addToCart);
router.post('/removeFromCart/:id', verifyUser, removeFromCart);

module.exports = router