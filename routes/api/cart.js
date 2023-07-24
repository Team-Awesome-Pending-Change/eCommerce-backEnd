const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/CartController');

router.get('/', async (req, res, next) => {
  try {
    const carts = await cartController.getAllCarts();
    res.json(carts);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, cartData } = req.body;
    const newCart = await cartController.createCart(userId, cartData);
    res.json(newCart);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const cart = await cartController.getCartById(id);
    if (!cart) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  const userId = req.params.userId;
  const cardId = req.body.cardId;
  const cartId = req.body.cartId;

  try {
    const cart = await cartController.addCardToCart(userId, cardId, cartId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const cart = await cartController.getCart(req.params.userId);
    if (!cart) {
      return res.status(404).json({ message: 'No cart found for this user.' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving cart for user.', error });
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

router.delete('/:id/items/:productId', async (req, res, next) => {
  try {
    const cart = await cartController.removeItemFromCart(
      req.params.id,
      req.params.productId,
    );
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
