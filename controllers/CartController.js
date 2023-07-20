const Cart = require('../models/Cart');

exports.getAllCarts = async () => {
  return await Cart.find({});
};

exports.getCartById = async (id) => {
  return await Cart.findOne({ _id: id });
};

exports.createCart = async (cartData) => {
  const cart = new Cart(cartData);
  return await cart.save();
};

exports.updateCart = async (id, updateData) => {
  return await Cart.findOneAndUpdate(
    { _id: id },
    { products: updateData.products },
    { new: true },
  );
};

exports.deleteCart = async (id) => {
  return await Cart.findByIdAndDelete(id);
};
