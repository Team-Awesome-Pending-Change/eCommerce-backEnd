const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: {  // Change from 'id' to 'userId'
    type: Schema.Types.ObjectId, // This should be an ObjectId
    ref: 'User', // This references the User model
    required: true,
  },
  cart: [{
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card', // This references the Card model
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
  totalPrice: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
