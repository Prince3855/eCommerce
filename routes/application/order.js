const express = require('express');
const router = express.Router();

const { verify } = require('../../controllers/application/verifyToken');
const { getOrders, createNewOrder } = require('../../controllers/application/order');

// GET : all orders
router.get('/', verify, getOrders);

// POST : make a order
router.post('/new', verify, createNewOrder);

module.exports = router;