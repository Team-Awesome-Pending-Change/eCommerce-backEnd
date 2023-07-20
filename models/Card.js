const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
    unique: true,
  },
  type: {
    type: String,
    required: false,
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