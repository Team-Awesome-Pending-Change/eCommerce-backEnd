const request = require('supertest');
const server = require('../server'); // Assuming your app is created and exported in "app.js" or similar.

describe('ProductController', () => {
  it('should get all products', async () => {
    const response = await request(server).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a product by id', async () => {
    const productId = 'example-product-id';
    const response = await request(server).get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(productId);
  });

  // Add similar tests for other functions in ProductController
});
