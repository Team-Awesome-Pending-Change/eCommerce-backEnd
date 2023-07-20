const express = require('express');
const router = express.Router();
const cardController = require('../controllers/CardController');

router.get('/', async (req, res) => {
  try {
    const cards = await cardController.getAllCards();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const card = await cardController.getCardById(req.params.id);
    if (card === null) {
      return res.status(404).json({ message: 'Cannot find card' });
    }
    res.json(card);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:type', async (req, res) => {
  try {
    const card = await cardController.getCardByType(req.params.type);
    if (card === null) {
      return res.status(404).json({ message: 'Cannot find card type' });
    }
    res.json(card);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;