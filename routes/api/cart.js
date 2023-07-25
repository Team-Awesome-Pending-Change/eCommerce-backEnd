// routes/api/carts.js

const express = require('express');
const cartController = require('../../controllers/CartController');

const router = express.Router();

router.get('/:id/getCart', cartController.getCart);
// router.get('/', cartController.getAllCarts);
router.post('/', cartController.createOrUpdateCart); // userId is now in the request body
router.put('/:userId', cartController.updateCart);
router.delete('/:userId/items/:id', cartController.deleteItemFromCart);
router.get('/', cartController.getAllCartsAndFindUserCart);

module.exports = router;
