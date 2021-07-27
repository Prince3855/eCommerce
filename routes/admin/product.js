const express = require('express');
const router = express.Router();

const { verify } = require('../../controllers/admin/verifyToken');
const { getProducts, createProduct, updateProduct, removeProduct } = require('../../controllers/admin/product');

// GET : all products
router.get('/', verify, getProducts);

// POST : crerate new product
router.post('/create', verify, createProduct);

// UPDATE : product
router.put('/update', verify, updateProduct);

// DELETE : crerate new product
router.delete('/remove', verify, removeProduct);

module.exports = router;