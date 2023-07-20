'use strict';

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

// Configure dotenv
dotenv.config();

// Prepare the express app with singleton
const app = express();
const port = process.env.PORT || 3002;

// App Level MW
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('This is the beginning....');
});

//start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});