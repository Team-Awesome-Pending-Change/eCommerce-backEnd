// const express = require('express');
// const cartController = require('../../controllers/CartController');

// const router = express.Router();

// router.get('/:id/getCart', cartController.getCart);
// router.get('/userCart/:userId', cartController.getUserCart);
// router.put('/:cartId', cartController.updateCart); 
// router.delete('/:userId/cart/:id', cartController.deleteItemFromCart);
// router.get('/', cartController.getAllCarts);

// router.post('/newCart/:userId', cartController.createOrUpdateCart);
// router.post('/emptyCart/:userId', cartController.createEmptyCart); // new route for creating an empty cart

// module.exports = router;
const express = require('express');
const cartController = require('../../controllers/CartController');

const router = express.Router();

router.get('/:cartId', cartController.getCart); // Route changed to /:cartId
router.get('/userCart/:userId', cartController.getUserCart);
router.put('/:cartId', cartController.updateCart); 
router.delete('/user/:userId/cart/:cartId', cartController.deleteItemFromCart); // Changed :id to :cartId for consistency
router.get('/', cartController.getAllCarts);

router.post('/', cartController.createOrUpdateCart); // Route changed to / and user id is passed in the body
router.post('/newCart/:userId', cartController.createEmptyCart);

module.exports = router;
