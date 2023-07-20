'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://pokemon-tcg-card-prices.p.rapidapi.com/card',
//   params: {
//   //   setId: '33ee55f4-30d0-4900-850f-36a351fb9719',
//   //   set: 'vivid-voltage',
//     series: 'red',
//   },
  
//   headers: {
//     'X-RapidAPI-Key': '8ae3d4e9bbmsh2a59744700e8e72p1854d6jsn3b6dcf9bc8f9',
//     'X-RapidAPI-Host': 'pokemon-tcg-card-prices.p.rapidapi.com',
//   },
// };

const options = {
  method: 'GET',
  url: 'http://yugiohprices.com/api/get_card_prices/card_name',
  
}

router.get('/yugioh', async (req, res) => {
  try {
    console.log('I am here' );
    
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json(error);
  }
});



module.exports = router;