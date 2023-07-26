const Cart = require("../models/Cart.js");

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.id });
  res.json(cart);
};

exports.getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const userCart = await Cart.findOne({ userId: userId }); // Assuming your Cart model has a userId field

    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllCarts = async (req, res) => {
  const carts = await Cart.find();
  res.json(carts);
};

exports.createOrUpdateCart = async (req, res) => {
  // console.log('CREATE OR UPDATE CART', req.body);
  const { itemId, quantity, userId } = req.body;
  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    cart = new Cart({
      userId: userId,
      items: [{ itemId, quantity }],
    });
  } else {
    cart.items.push({ itemId, quantity });
  }

  await cart.save();
  res.json(cart);
};

exports.updateCart = async (req, res) => {
  // console.log('UPDATE CART', req.body);

  const { itemId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });

  if (cart) {
    const itemIndex = cart.items.findIndex((item) => item.itemId === itemId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ itemId, quantity });
    }

    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ error: "Cart not found." });
  }
};

exports.getAllCartsAndFindUserCart = async (req, res) => {
  const carts = await Cart.find();
  const userCart = carts.find((cart) => cart.userId === req.body.userId);
  res.json(userCart);
};

exports.deleteItemFromCart = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.params.userId });

  if (cart) {
    cart.items = cart.items.filter((item) => item.itemId !== req.params.id);

    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ error: "Cart not found." });
  }
};
