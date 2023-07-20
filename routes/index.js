'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/pokemon', async (req, res) => {
  try {
    const response = await axios.get('https://pokemon-tcg-card-prices.p.rapidapi.com/card', {
      headers: {
        'x-rapidapi-host': 'pokemon-tcg-card-prices.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY, 
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

module.exports = router;

