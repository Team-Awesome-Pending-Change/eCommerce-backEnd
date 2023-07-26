const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const axios = require('axios');

const cardController = {
  getAllCards: async () => {
    let cards = await Card.find({}).limit(30);

    if (cards.length === 0) {
      await cardController.getCardsFromApi();
      cards = await Card.find({}).limit(30);
    }

    return cards;
  },

  getCardById: async (id) => {
    return await Card.findOne({ id: id });
  },

  getCardByType: async (type) => {
    return await Card.find({ type: type });
  },

  getCardByAttribute: async (attribute) => {
    return await Card.find({ attribute: attribute });
  },

  getCardByName: async (name) => {
    return await Card.findOne({ name: name });
  },

  updateCardStock: async (id, inStock) => {
    try {
      const card = await Card.findById(id);
      if (!card) {
        throw new Error('Card not found.');
      }

      if (inStock < 0) {
        throw new Error('Stock cannot be less than 0.');
      }

      card.inStock = inStock;
      const updatedCard = await card.save();

      return updatedCard;
    } catch (err) {
      throw err;
    }
  },

  addCard: async (cardData) => {
    try {
      const newCard = new Card(cardData);
      const savedCard = await newCard.save();
      return savedCard;
    } catch (err) {
      throw err;
    }
  },

  deleteCard: async (id) => {
    const card = await Card.findById(id);
    if (!card) {
      throw new Error('Card not found.');
    }

    await card.remove();
    return true;
  },

  getCardsFromApi: async () => {
    try {
      const response = await axios.get(
        'https://db.ygoprodeck.com/api/v7/cardinfo.php',
      );
      let cards = response.data.data;

      if (cards.length > 30) {
        cards = cards.slice(0, 30);
      }

      for (const card of cards) {
        const existingCard = await Card.findOne({ id: card.id });

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
  },
};

module.exports = cardController;
