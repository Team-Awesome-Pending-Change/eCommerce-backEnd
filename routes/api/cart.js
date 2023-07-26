const express = require('express');
const cartController = require('../../controllers/CartController');

const router = express.Router();

router.get('/:id/getCart', cartController.getCart);
router.get('/userCart/:userId', cartController.getUserCart); // Add this line
router.post('/newCart/:userId', cartController.createOrUpdateCart); // Add this line

// router.post('/', cartController.createOrUpdateCart);
router.put('/:userId', cartController.updateCart);
router.delete('/:userId/items/:id', cartController.deleteItemFromCart);
router.get('/', cartController.getAllCartsAndFindUserCart);

module.exports = router;
