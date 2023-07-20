'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user.js');

// Configure dotenv
dotenv.config();

//MongoDb connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => { console.log('Connected to MongoDB'); })
  .catch((err) => { console.log(err); });

// Prepare the express app with singleton
const app = express();
const port = process.env.PORT || 3002;

// App Level Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the beginning....');
});

app.get('/test', (req, res) => {
  res.send('This is the test....');
});

// Routes
app.use(userRoutes); // localhost:300/usertest route


//start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = app;