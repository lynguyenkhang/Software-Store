const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.api.controller.js');

router.patch('/getManyProducts', controller.getManyProducts)
router.patch('/changeVolume', controller.changeVolume)
router.delete('/deleteOneProduct', controller.deleteProductInCart)

module.exports = router;