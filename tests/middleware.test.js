const { expect } = require('chai');
const express = require('express');
const applyCustomMiddleware = require('../middleware');
const request = require('supertest');

describe('Custom Middleware', () => {
  let app;

  before(() => {
    app = express();
    // Apply custom middleware to the app
    applyCustomMiddleware(app);
  });

  it('should set up logger middleware', async () => {
    // Create a test route to check if the logger middleware is working
    app.get('/test-logger', (req, res) => {
      res.send('Test Logger Middleware');
    });

    const response = await request(app).get('/test-logger');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Test Logger Middleware');
  });

  it('should set up static middleware', async () => {
    // Create a test route to check if the static middleware is working
    const staticFilePath = path.join(__dirname, '../public/test.html');
    app.get('/test-static', (req, res) => {
      res.sendFile(staticFilePath);
    });

    const response = await request(app).get('/test-static');
    expect(response.status).to.equal(200);
    expect(response.type).to.equal('text/html');
  });

  it('should set up express.json middleware', async () => {
    // Create a test route to check if the express.json middleware is working
    app.post('/test-json', (req, res) => {
      res.json(req.body);
    });

    const data = { message: 'Hello, World!' };
    const response = await request(app).post('/test-json').send(data);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(data);
  });

  it('should set up cors middleware', async () => {
    // Create a test route to check if the cors middleware is working
    app.get('/test-cors', (req, res) => {
      res.send('Test CORS Middleware');
    });

    const response = await request(app).get('/test-cors');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Test CORS Middleware');
    expect(response.header['access-control-allow-origin']).to.equal('http://localhost:3000');
    expect(response.header['access-control-allow-methods']).to.equal('GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    expect(response.header['access-control-allow-headers']).to.equal('Content-Type, Authorization');
  });

  it('should set up error handling middleware for ValidationError', async () => {
    // Create a test route that throws a ValidationError
    app.get('/test-validation-error', (req, res, next) => {
      const err = new Error('Test Validation Error');
      err.name = 'ValidationError';
      next(err);
    });

    const response = await request(app).get('/test-validation-error');
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('Test Validation Error');
  });

  it('should set up error handling middleware for MongoError', async () => {
    // Create a test route that throws a MongoError
    app.get('/test-mongo-error', (req, res, next) => {
      const err = new Error('Test Mongo Error');
      err.name = 'MongoError';
      next(err);
    });

    const response = await request(app).get('/test-mongo-error');
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('There was a problem with the database operation');
  });
});
