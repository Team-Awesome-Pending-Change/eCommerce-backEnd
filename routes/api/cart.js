const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/CartController');

router.get('/', async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] GET /api/cart`, req.body);
  try {
    const carts = await cartController.getAllCarts();
    res.json(carts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  console.log('GET /api/cart/:id', req.body);
  console.log('req.params.id', req.params.id);
  try {
    const cart = await cartController.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/addToCart', async (req, res, next) => {
  
  console.log('POST /api/cart/:id/addToCart', req.body);
  try {
    const cart = await cartController.addItemToCart(req.params.id, req.body);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.get('/api/cart/:userId', async (req, res) => {
  try {
    const cart = await cartController.getCart(req.params.userId);
    if (!cart) {
      return res.status(404).json({ message: 'No cart found for this user.' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving cart for user.', error });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const cart = await cartController.updateCart(req.params.id, req.body);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const cart = await cartController.deleteCart(req.params.id);
    if (cart === null) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/items', async (req, res, next) => {
  console.log('PUT /api/cart/:id/items', req.body);
  try {
    const cart = await cartController.addItemToCart(req.params.id, req.body);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/items/:productId', async (req, res, next) => {
  try {
    const cart = await cartController.removeItemFromCart(req.params.id, req.params.productId);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
