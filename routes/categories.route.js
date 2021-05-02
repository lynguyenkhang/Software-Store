const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories.controller.js');

router.get('/:categoryName', controller.index);

module.exports = router;