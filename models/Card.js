const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  image: {
    type: String,

  },
  price: {
    type: Number,

  },
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);