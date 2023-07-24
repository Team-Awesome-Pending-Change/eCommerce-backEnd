const Card = require('../models/Card');

exports.getAllCarts = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addCart = async (req, res) => {
  try {
    const newCard = new Card(req.body);
    const savedCard = await newCard.save();
    res.json(savedCard);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.json(card);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, // returns the updated document
    );
    res.json(updatedCard);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};

// const Cart = require('../models/Cart');

// exports.getAllCarts = async () => {
//   console.log('getAllCarts', Cart);
//   try {
//     const carts = await Cart.find({}).populate('cart.card');
//     console.log('carts', carts);
//     console.log('Successfully retrieved all carts');
//     return carts;
//   } catch (error) {
//     console.error('Error retrieving all carts:', error);
//     throw error;
//   }
// };

// exports.getCartById = async (req, res, next) => {
//   try {
//     const cart = await Cart.findById(req.params.id).populate('cart.card');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cannot find cart' });
//     }
//     res.json(cart);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getCartByUserId = async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId }).populate(
//       'cart.card',
//     );
//     if (!cart) {
//       return res.status(404).json({ message: 'No cart found for this user.' });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.createCart = async (req, res, next) => {
//   try {
//     const { userId, cardInfo, cartData } = req.body;
//     const cart = new Cart({
//       userId,
//       cart: [
//         {
//           card: cardInfo.id,
//           cardName: cartData.name,
//           quantity: cardInfo.quantity || 1,
//           totalPrice: cardInfo.price || 0,
//         },
//       ],
//     });
//     const savedCart = await cart.save();
//     res.json(savedCart);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.addCardToCart = async (req, res, next) => {
//   console.log('addCardToCart', req.body);
//   try {
//     const cart = await Cart.findById(req.params.id);
//     console.log('cart', cart);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cannot find cart' });
//     }
//     cart.cart.push(req.body);
//     console.log('cart.cart', cart.cart);
//     const updatedCart = await cart.save();
//     res.json(updatedCart);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.updateCart = async (req, res, next) => {
//   const { userId, cardInfo, cartData } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId: userId });

//     if (!cart) {
//       cart = new Cart({
//         userId,
//         cart: [],
//       });
//     }

//     const newCartItem = {
//       card: cardInfo.id,
//       cardName: cartData.name,
//       quantity: cardInfo.quantity || 1,
//       totalPrice: cardInfo.price || 0,
//     };

//     cart.cart.push(newCartItem);

//     const savedCart = await cart.save();
//     res.status(200).json(savedCart);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.removeItemFromCart = async (req, res, next) => {
//   try {
//     const cart = await Cart.findById(req.params.id);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cannot find cart' });
//     }
//     const itemIndex = cart.cart.findIndex(
//       (item) => item.card.toString() === req.params.productId,
//     );
//     if (itemIndex > -1) {
//       cart.cart.splice(itemIndex, 1);
//     }
//     const updatedCart = await cart.save();
//     res.json(updatedCart);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteCart = async (req, res, next) => {
//   try {
//     const deletedCart = await Cart.findByIdAndDelete(req.params.id);
//     if (!deletedCart) {
//       return res.status(404).json({ message: 'Cannot find cart' });
//     }
//     res.json({ message: 'Cart deleted successfully' });
//   } catch (error) {
//     next(error);
//   }
// };
