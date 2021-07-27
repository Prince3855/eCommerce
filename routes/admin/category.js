const express = require('express');
const router = express.Router();

const { createCategory, removeCategory, getCategories } = require('../../controllers/admin/category');

// GET : all categories
router.get('/', getCategories)

// POST : create new category
router.post('/create', createCategory);

// DELETE : remove category
router.delete('/remove', removeCategory);

module.exports = router;