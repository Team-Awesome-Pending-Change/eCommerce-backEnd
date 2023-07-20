const Card = require('../models/Card');
//url route for yugioh cards https://db.ygoprodeck.com/api/v7/cardinfo.php  
exports.getAllCards = async () => {
  return await Card.find({});
};

exports.getCardById = async (id) => {
  return await Card.findOne({ _id: id });
};

exports.getCardByType = async (type) => {
  return await Card.find({ type: type });
};
