const express = require('express');
const router = express.Router();

const { postLogin, postRegister } = require('../../controllers/application/auth');

// POST : Customer register
router.post('/register', postRegister);

// POST : Customer Login
router.post('/login',postLogin);


module.exports = router;