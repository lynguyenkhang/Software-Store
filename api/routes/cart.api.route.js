const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.api.controller.js');

router.get('/', controller.getOneCart);
router.patch('/', controller.updateOneCart)

module.exports = router;