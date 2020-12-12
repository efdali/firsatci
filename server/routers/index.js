const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.products);
router.get('/:productId', productController.productDetail);
router.post('/new', productController.newProduct);

module.exports = router;
