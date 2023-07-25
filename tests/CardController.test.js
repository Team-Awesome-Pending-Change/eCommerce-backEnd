const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const app = require('../server'); // Import the app instance from server.js
const Card = require('../models/Card');
const CardController = require('../controllers/CardController');

describe('CardController', () => {
  // ... (before, after, and afterEach hooks)

  describe('GET /api/cards', () => {
    it('should get all cards', async () => {
      // Stub Card.find to return the test card
      sinon.stub(Card, 'find').returns([testCard]);

      const response = await request(app).get('/api/cards');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0].id).to.equal(testCard.id);
    });
  });

  describe('GET /api/cards/:id', () => {
    it('should get a card by id', async () => {
      const testCardId = 'TestCardID';
      // Stub Card.findOne to return the test card
      sinon.stub(Card, 'findOne').resolves(testCard);

      const response = await request(app).get(`/api/cards/${testCardId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(testCard.id);
    });

    it('should return 404 if card with given id is not found', async () => {
      const nonExistentCardId = 'NonExistentCardID';
      // Stub Card.findOne to return null to simulate card not found
      sinon.stub(Card, 'findOne').resolves(null);

      const response = await request(app).get(`/api/cards/${nonExistentCardId}`);
      expect(response.status).to.equal(404);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.equal('Card not found.');
    });
  });

  // ... (Other test cases for remaining functions in CardController.js)

});
