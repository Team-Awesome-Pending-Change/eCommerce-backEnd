const Card = require('../models/Card');
const axios = require('axios');

exports.getAllCards = async () => {
  let cards = await Card.find({}).limit(30);

  if (cards.length === 0) {
    // If no cards in database, fetch from API and save to database
    await exports.getCardsFromApi();
    cards = await Card.find({}).limit(30);
  }

  return cards;
};

exports.getCardById = async (id) => {
  return await Card.findOne({ id: id });
};

exports.getCardByType = async (type) => {
  return await Card.find({ type: type });
};

exports.getCardByAttribute = async (attribute) => {
  return await Card.find({ attribute: attribute });
};

exports.getCardByName = async (name) => {
  return await Card.findOne({ name: name });
};

exports.updateCardStock = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found.' });
    }

    const newStock = req.body.inStock;
    if (newStock < 0) {
      return res.status(400).json({ message: 'Stock cannot be less than 0.' });
    }

    card.inStock = newStock;
    const updatedCard = await card.save();

    res.json(updatedCard);
  } catch (err) {
    res.status(500).send(err);
  }
};


// Fetch card data from external API and save to database
exports.getCardsFromApi = async () => {
  try {
    const response = await axios.get(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php',
    );
    let cards = response.data.data;

    // If more than 30 cards, reduce to the first 30
    if (cards.length > 30) {
      cards = cards.slice(0, 30);
    }

    // Insert all cards into the database
    for (const card of cards) {
      // Check if the card already exists in the database
      const existingCard = await Card.findOne({ id: card.id });

      // If the card doesn't exist, save it
      if (!existingCard) {
        const newCard = new Card({
          id: card.id,
          name: card.name,
          type: card.type,
          frameType: card.frameType,
          desc: card.desc,
          atk: card.atk,
          def: card.def,
          level: card.level,
          race: card.race,
          attribute: card.attribute,
          card_images: card.card_images,
          card_prices: card.card_prices,
        });

        await newCard.save();
      }
    }
  } catch (error) {
    console.error('Error fetching data from the API: ', error);
  }
};


