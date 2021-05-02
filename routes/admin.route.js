const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller.js');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware.auth ,controller.index)
router.get('/login', controller.login);
router.post('/login', controller.checkLogin);

router.get('/orders', authMiddleware.auth, controller.orders)
router.get('/details/:orderID', authMiddleware.auth, controller.detailsOrder)

router.get('/addProduct', authMiddleware.auth, controller.addProductIndex)
router.post('/addProduct', authMiddleware.auth, controller.addProduct)


router.post('/api/updateOrderStatus/:orderID', authMiddleware.auth, controller.updateOrderStatus)

router.delete('/api/deleteProduct/:id', authMiddleware.auth, controller.deleteProduct)
router.delete('/api/deleteOrder/:id', authMiddleware.auth, controller.deleteOrder)


router.get('/updateProduct/:id', authMiddleware.auth, controller.updateProductIndex)
router.post('/updateProduct/:id', authMiddleware.auth, controller.updateProduct)

module.exports = router;