const express = require('express');
const router = express.Router();
const controller = require('../controllers/models.controller.js');

router.get('/:categoriesName/:modelsName', controller.index);

module.exports = router;