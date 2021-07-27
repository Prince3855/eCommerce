const express = require('express');
const router = express.Router();

const { postLogin, postRegister } = require('../../controllers/admin/auth');

// POST : Admin register
router.post('/register', postRegister);

// POST : Admin Login
router.post('/login',postLogin);


module.exports = router;