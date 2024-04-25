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

describe('POST /order', () => {
  it('should create a new order and return it with tickets', async () => {
    const userId = 'user123';
    const basket = {
      offer123: 2,
      offer456: 1
    };

    const dbStub = sinon.stub(db, 'tx').resolves();

    const response = await request(app)
      .post('/order')
      .send({ userId, basket });

    assert.strictEqual(response.status, 201);
    assert.ok(response.body);
    assert.strictEqual(response.body.userid, userId);
    assert.ok(response.body.id);
    assert.ok(response.body.date);
    assert.ok(response.body.tickets);

    dbStub.restore();
  });
});

describe('GET /orders', () => {
  it('should return orders with tickets for the given userId', async () => {
    const userId = 'exampleUserId';
    const mockOrders = [
      { id: 1, userId: 'exampleUserId', orderDate: '2024-04-25' },
      { id: 2, userId: 'exampleUserId', orderDate: '2024-04-26' }
    ];
    const mockTickets = [
      { id: 1, orderId: 1, ticketNumber: 'A123' },
      { id: 2, orderId: 1, ticketNumber: 'A124' },
      { id: 3, orderId: 2, ticketNumber: 'B125' }
    ];
    const expectedResponse = [
      { id: 1, userId: 'exampleUserId', orderDate: '2024-04-25', tickets: [{ id: 1, orderId: 1, ticketNumber: 'A123' }, { id: 2, orderId: 1, ticketNumber: 'A124' }] },
      { id: 2, userId: 'exampleUserId', orderDate: '2024-04-26', tickets: [{ id: 3, orderId: 2, ticketNumber: 'B125' }] }
    ];

    sinon.stub(db, 'manyOrNone').callsFake(async (query, values) => {
      if (query.includes('SELECT * FROM orders')) {
        return mockOrders.filter(order => order.userId === values[0]);
      } else if (query.includes('SELECT * FROM tickets')) {
        const orderId = values[0];
        return mockTickets.filter(ticket => ticket.orderId === orderId);
      }
    });

    const response = await request(app).get('/orders').query({ userId });

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, expectedResponse);

    db.manyOrNone.restore();
  });

  it('should return 400 if userId parameter is missing', async () => {
    const response = await request(app).get('/orders');
    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: 'userId parameter is required' });
  });
});

