const Cart = require('../models/Cart');

exports.getAllCarts = async () => {
  console.log('getAllCarts', Cart);
  try {
    const carts = await Cart.find({}).populate('cart.card');
    console.log('Successfully retrieved all carts');
    return carts;
  } catch (error) {
    console.error('Error retrieving all carts:', error);
    throw error;
  }
};

exports.getCartById = async (id) => {
  try {
    const cart = await Cart.findById(id).populate('cart.card');
    if (!cart) {
      throw new Error(`Cart with id ${id} not found.`);
    }
    
    console.log(`Successfully retrieved cart with id ${id}`);
    console.log('cart:', cart.cart);
    return cart;
  } catch (error) {
    console.error(`Error retrieving cart with id ${id}:`, error);
    throw error;
  }
};

exports.getCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ id: userId }).populate('cart.card');
    if (!cart) {
      console.error(`No cart found for user ${userId}`);
      return null;
    }
    console.log(`Successfully retrieved cart for user ${userId}`, cart);
    return cart;
  } catch (error) {
    console.error(`Error retrieving cart for user ${userId}:`, error);
    throw error;
  }
};

exports.createCart = async (cardInfo) => {
  console.log('createCart', cardInfo);
  try {
    const cart = new Cart(cardInfo);
    const savedCart = await cart.save();
    console.log('Successfully created new cart', savedCart);
    return savedCart;
  } catch (error) {
    console.error('Error creating new cart:', error);
    throw error;
  }
};

exports.updateCart = async (id, updateData) => {
  console.log('updateCart', id, updateData);
  try {
    const cart = await Cart.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).populate('cart.card');
    console.log(`Successfully updated cart with id ${id}`, cart);
    return cart;
  } catch (error) {
    console.error(`Error updating cart with id ${id}:`, error);
    throw error;
  }
};
exports.addItemToCart = async (req, res, next) => {
  const userId = req.params;
  const cardId = req.body.cardInfo.id;
  console.log('userId', userId);
  console.log('cardId', cardId);
  console.log('req.body', req.body.cardInfo);
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({ userId: userId, cart: [] });
    }
    cart.cart.push({ card: cardId });
    const updatedCart = await cart.save();
    console.log(`Successfully added item to cart for user ${userId}`, updatedCart);
    return updatedCart;
  } catch (error) {
    console.error(`Error adding item to cart for user ${userId}:`, error);
    throw error;
  }
};

exports.removeItemFromCart = async (id, cardInfo) => {
  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      throw new Error(`Cart with id ${id} not found.`);
    }
    const itemIndex = cart.cart.findIndex((item) => item.card.toString() === cardInfo);
    if (itemIndex > -1) {
      cart.cart.splice(itemIndex, 1);
    }
    const updatedCart = await cart.save();
    console.log(`Successfully removed item from cart with id ${id}`, updatedCart);
    return updatedCart;
  } catch (error) {
    console.error(`Error removing item from cart with id ${id}:`, error);
    throw error;
  }
};

exports.deleteCart = async (id) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    console.log(`Successfully deleted cart with id ${id}`);
    return deletedCart;
  } catch (error) {
    console.error(`Error deleting cart with id ${id}:`, error);
    throw error;
  }
};
