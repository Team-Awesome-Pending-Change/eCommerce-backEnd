const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/CartController');

router.get('/', async (req, res) => {
  try {
    const carts = await cartController.getAllCarts();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cart = await cartController.getCartById(req.params.id);
    if (cart === null) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cart = await cartController.createCart(req.body);
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cart = await cartController.updateCart(req.params.id, req.body);
    res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cart = await cartController.deleteCart(req.params.id);
    if (cart === null) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
