const express = require('express');
const router = express.Router();

const { getProducts } = require('../../controllers/application/data');

// GET : all products
router.get('/products', getProducts);

module.exports = router;