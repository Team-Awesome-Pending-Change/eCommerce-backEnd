const Card = require('../models/Card');

exports.getAllCards = async () => {
  return await Card.find({});
};

exports.getCardById = async (id) => {
  return await Card.findOne({ _id: id });
};

exports.getCardByType = async (type) => {
  return await Card.find({ type: type });
};
