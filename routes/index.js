const express = require('express');
const router = express.Router();

const userRoutes = require('./api/user');
const orderRoutes = require('./api/order');
const productRoutes = require('./api/product');
const cartRoutes = require('./api/cart');

router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

module.exports = router;
