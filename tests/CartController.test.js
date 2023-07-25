const request = require('supertest');
const express = require('express');
const { expect } = require('chai'); // Import chai's expect assertion
const CartController = require('../controllers/CartController');
const Card = require('../models/Card');

// Create an Express app
const app = express();
app.use(express.json());

// Define the routes for CartController
app.get('/carts', CartController.getAllCarts);
app.post('/carts', CartController.addCart); // Changed to addCart to match the controller function
app.get('/carts/:id', CartController.getCart);
app.put('/carts/:id', CartController.updateCart); // Added route for updating cart
app.delete('/carts/:id', CartController.deleteCart); // Added route for deleting cart

// Mock the Card model's methods
Card.find = async () => {
  // Replace this with your mock data or any desired behavior for testing
  return [{ _id: '1', name: 'Card 1' }, { _id: '2', name: 'Card 2' }];
};

Card.findById = async (id) => {
  // Replace this with your mock data or any desired behavior for testing
  return { _id: id, name: 'Test Card' };
};

Card.findByIdAndUpdate = async (id, data, options) => {
  // Replace this with your mock data or any desired behavior for testing
  return { _id: id, ...data };
};

Card.findByIdAndDelete = async (id) => {
  // Replace this with your mock data or any desired behavior for testing
  return { _id: id, name: 'Deleted Card' };
};

describe('CartController', () => {
  it('should get all carts', (done) => {
    request(app)
      .get('/carts')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array'); // Expect the response to be an array
        done();
      });
  });

  it('should add a new cart', (done) => {
    const cartData = { name: 'New Card' };
    request(app)
      .post('/carts')
      .send(cartData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id'); // Expect the response to have '_id' property
        done();
      });
  });

  it('should get a cart by id', (done) => {
    const id = 'test-id';
    request(app)
      .get(`/carts/${id}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', id); // Expect the response to have '_id' property with the provided id
        done();
      });
  });

  it('should update a cart', (done) => {
    const id = 'test-id';
    const cartData = { name: 'Updated Card' };
    request(app)
      .put(`/carts/${id}`)
      .send(cartData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', id); // Expect the response to have '_id' property with the provided id
        expect(res.body).to.have.property('name', 'Updated Card'); // Expect the response to have updated 'name'
        done();
      });
  });

  it('should delete a cart', (done) => {
    const id = 'test-id';
    request(app)
      .delete(`/carts/${id}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', id); // Expect the response to have '_id' property with the provided id
        expect(res.body).to.have.property('name', 'Deleted Card'); // Expect the response to indicate a deleted card
        done();
      });
  });
});
