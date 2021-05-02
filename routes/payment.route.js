const express = require('express');
const router = express.Router();
const controller = require('../controllers/payment.controller.js');

router.get('/', controller.index);
router.post('/', controller.makeOrder)

module.exports = router;