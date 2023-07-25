const Card = require('./Card');
const Cart = require('./Cart');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');

// Mock mongoose models
jest.mock('./Card');
jest.mock('./Cart');
jest.mock('./Order');
jest.mock('./Product');
jest.mock('./User');

describe('Models Test', () => {
  test('should create and fetch a Card', async () => {
    // Mock Card model methods
    const cardData = { id: 1, name: 'Test Card' };
    Card.create.mockResolvedValue(cardData);
    Card.findById.mockResolvedValue(cardData);

    const createdCard = await Card.create({ id: 1, name: 'Test Card' });
    const fetchedCard = await Card.findById(1);

    expect(createdCard).toMatchObject(cardData);
    expect(fetchedCard).toMatchObject(cardData);
  });


  test('should create and fetch a Cart', async () => {
    // Mock Cart model methods
    const cartData = { userId: 'user_id', cart: [{ card: 'card_id', quantity: 2 }], totalPrice: 100 };
    Cart.create.mockResolvedValue(cartData);
    Cart.findById.mockResolvedValue(cartData);

    const createdCart = await Cart.create({ userId: 'user_id', cart: [{ card: 'card_id', quantity: 2 }] });
    const fetchedCart = await Cart.findById('cart_id');

    expect(createdCart).toMatchObject(cartData);
    expect(fetchedCart).toMatchObject(cartData);
  });

  test('should create and fetch an Order', async () => {
    // Mock Order model methods
    const orderData = { userId: 'user_id', products: [{ productId: 'product_id', quantity: 1 }], amount: 50 };
    Order.create.mockResolvedValue(orderData);
    Order.findById.mockResolvedValue(orderData);

    const createdOrder = await Order.create({ userId: 'user_id', products: [{ productId: 'product_id', quantity: 1 }] });
    const fetchedOrder = await Order.findById('order_id');

    expect(createdOrder).toMatchObject(orderData);
    expect(fetchedOrder).toMatchObject(orderData);
  });

  test('should create and fetch a Product', async () => {
    // Mock Product model methods
    const productData = { _id: 'product_id', category: 'electronics', name: 'Test Product', price: 50, inStock: 10 };
    Product.create.mockResolvedValue(productData);
    Product.findById.mockResolvedValue(productData);

    const createdProduct = await Product.create({ name: 'Test Product', price: 50, inStock: 10 });
    const fetchedProduct = await Product.findById('product_id');

    expect(createdProduct).toMatchObject(productData);
    expect(fetchedProduct).toMatchObject(productData);
  });

  test('should create and fetch a User', async () => {
    // Mock User model methods
    const userData = { basic_info: { name: 'John Doe' }, login_data: { username: 'johndoe', password: 'password' } };
    User.create.mockResolvedValue(userData);
    User.findById.mockResolvedValue(userData);

    const createdUser = await User.create({ basic_info: { name: 'John Doe' }, login_data: { username: 'johndoe', password: 'password' } });
    const fetchedUser = await User.findById('user_id');

    expect(createdUser).toMatchObject(userData);
    expect(fetchedUser).toMatchObject(userData);
  });
});
