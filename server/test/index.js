const assert = require('assert');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
const request = require('supertest');
const { app, db } = require('../index');

describe('GET /offers', () => {
  it('should return all offers', async () => {
    const mockOffers = [
      { id: 1, name: 'Offer 1', price: 10, includedtickets: 5, active: true, ticket_count: 2 },
      { id: 2, name: 'Offer 2', price: 15, includedtickets: 3, active: false, ticket_count: 0 }
    ];
    const dbStub = sinon.stub(db, 'any').resolves(mockOffers);

    const response = await request(app).get('/offers');

    assert.strictEqual(response.status, 200);

    assert.deepStrictEqual(response.body, mockOffers);

    dbStub.restore();
  });
});

describe('POST /offer', () => {
  it('should create a new offer and return it', async () => {
    const newOffer = {
      name: 'New Offer',
      price: 20,
      includedtickets: 2,
      active: true
    };

    const dbStub = sinon.stub(db, 'one').resolves(newOffer);

    const response = await request(app)
      .post('/offer')
      .send(newOffer);

    assert.strictEqual(response.status, 201);
    assert.ok(response.body);
    assert.strictEqual(response.body.name, newOffer.name);
    assert.strictEqual(response.body.price, newOffer.price);
    assert.strictEqual(response.body.includedtickets, newOffer.includedtickets);
    assert.strictEqual(response.body.active, newOffer.active);

    dbStub.restore();
  });

  it('should return 400 if invalid data is provided', async () => {
    const invalidOffer = {
      // Missing name field
      price: 20,
      includedtickets: 2,
      active: true
    };

    const response = await request(app)
      .post('/offer')
      .send(invalidOffer);

    assert.strictEqual(response.status, 400);
  });
});

describe('PATCH /offer/:id', () => {
  it('should update offer name and return updated offer', async () => {
    const offerId = '1';
    const updatedFields = {
      name: 'Updated Offer Name'
    };
    const updatedOffer = {
      id: offerId,
      name: updatedFields.name,
      price: 20,
      includedtickets: 2,
      active: true
    };

    const dbStub = sinon.stub(db, 'one').resolves(updatedOffer);

    const response = await request(app)
      .patch(`/offer/${offerId}`)
      .send(updatedFields);

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, updatedOffer);

    dbStub.restore();
  });

  it('should return 400 if neither name nor active field is provided', async () => {
    const offerId = '1';
    const invalidFields = {};

    const response = await request(app)
      .patch(`/offer/${offerId}`)
      .send(invalidFields);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, 'Name or active field must be provided for update');
  });
});

describe('POST /user', () => {
  it('should create a new user and return success message', async () => {
    const newUser = {
      username: 'testUser',
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@example.com',
      password: 'password123'
    };

    const bcryptStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
    const dbNoneStub = sinon.stub(db, 'none').resolves();

    const response = await request(app)
      .post('/user')
      .send(newUser);

    assert.strictEqual(response.status, 201);
    assert.deepStrictEqual(response.body, { status: "success", message: "Utilisateur crée" });

    bcryptStub.restore();
    dbNoneStub.restore();
  });
});

describe('Authentication and Order Flow', () => {
  let agent;

  beforeEach(() => {
    agent = request.agent(app); // Create a persistent agent for maintaining session
  });

  afterEach(() => {
    agent = null; // Clear the agent after each test
  });

  it('should log in, order, and access orders', async function() {
    this.timeout(5000); // Set the timeout to 5000ms (5 seconds)

    // 1. Log in
    const loginResponse = await agent
      .post('/login')
      .send({ username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD });

    assert.strictEqual(loginResponse.status, 200);

    // 2. Order
    const orderResponse = await agent
      .post('/order')
      .send({ userId: process.env.TEST_USERID, basket: { [process.env.TEST_OFFERID]: 1 } });

    assert.strictEqual(orderResponse.status, 201);
    assert.ok(orderResponse.body);
    assert.strictEqual(orderResponse.body.userid, process.env.TEST_USERID);
    assert.ok(orderResponse.body.id);
    assert.ok(orderResponse.body.date);
    assert.ok(orderResponse.body.tickets);

    // 3. Access orders
    const ordersResponse = await agent.get('/orders').query({ userId: process.env.TEST_USERID });

    assert.strictEqual(ordersResponse.status, 200);

    // Check if the specific order created in step 2 is returned
    const specificOrder = ordersResponse.body.find(order => order.id === orderResponse.body.id);
    assert.ok(specificOrder, 'Specific order not found');

    // Check if the tickets from step 2 are included in the specific order
    const ticketsInSpecificOrder = specificOrder.tickets;
    assert.deepStrictEqual(ticketsInSpecificOrder, orderResponse.body.tickets, 'Tickets from step 2 not found in specific order');
  });
});


