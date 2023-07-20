const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//Register users
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PW_SECRET).toString(),
  });

  try {
    const savedUser = await newUser.save();
    console.log('savedUser: ', savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
  
});


module.exports = router;