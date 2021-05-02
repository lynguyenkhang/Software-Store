const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller.js');

router.get('/:categoriesName/:productsName', controller.index);

module.exports = router;