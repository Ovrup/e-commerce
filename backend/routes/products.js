const express = require('express');
const { getProducts, getProduct, createProduct, deleteProduct } = require('../controller/product');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/addProduct', createProduct)
router.delete('/deleteProduct/:id', deleteProduct)

module.exports = router