const request = require('supertest');
const express = require('express');
const app = express();

// Mock the CardController functions
const cardController = require('../../controllers/CardController');
jest.mock('../../controllers/CardController', () => ({
  getAllCards: jest.fn().mockResolvedValue([
    { id: 1, name: 'Card 1', type: 'Type A', attribute: 'Attribute X' },
    { id: 2, name: 'Card 2', type: 'Type B', attribute: 'Attribute Y' },
  ]),
  getCardById: jest.fn().mockImplementation((id) => {
    const card = mockedCards.find((c) => c.id === parseInt(id));
    return Promise.resolve(card || null);
  }),
  getCardByType: jest.fn().mockImplementation((type) => {
    const cards = mockedCards.filter((c) => c.type === type);
    return Promise.resolve(cards);
  }),
  getCardByAttribute: jest.fn().mockImplementation((attribute) => {
    const cards = mockedCards.filter((c) => c.attribute === attribute);
    return Promise.resolve(cards);
  }),
}));

// Mount the routes in the express app
const cardRoutes = require('./card');
app.use('/cards', cardRoutes);

// Mocked data for testing
const mockedCards = [
  { id: 1, name: 'Card 1', type: 'Type A', attribute: 'Attribute X' },
  { id: 2, name: 'Card 2', type: 'Type B', attribute: 'Attribute Y' },
];

describe('Card Routes', () => {
  test('GET /cards should return all cards', async () => {
    const response = await request(app).get('/cards');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedCards);
  });

  test('GET /cards/id/:id should return a single card by ID', async () => {
    const cardId = 1; // Change this to test different card IDs
    const response = await request(app).get(`/cards/id/${cardId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedCards[0]);
  });

  test('GET /cards/type/:type should return cards of a given type', async () => {
    const cardType = 'Type A'; // Change this to test different card types
    const response = await request(app).get(`/cards/type/${cardType}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockedCards[0]]);
  });

  test('GET /cards/attribute/:attribute should return cards of a given attribute', async () => {
    const cardAttribute = 'Attribute Y'; // Change this to test different attributes
    const response = await request(app).get(`/cards/attribute/${cardAttribute}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockedCards[1]]);
  });

});
