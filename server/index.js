
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const pgp = require('pg-promise')();
const app = express();
require('dotenv').config();

const PGUSER = process.env.PGUSER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const RAILWAY_TCP_PROXY_DOMAIN = process.env.RAILWAY_TCP_PROXY_DOMAIN;
const RAILWAY_TCP_PROXY_PORT = process.env.RAILWAY_TCP_PROXY_PORT;
const PGDATABASE = process.env.PGDATABASE;
const db = pgp(`postgresql://${PGUSER}:${POSTGRES_PASSWORD}@${RAILWAY_TCP_PROXY_DOMAIN}:${RAILWAY_TCP_PROXY_PORT}/${PGDATABASE}`)

const corsOptions = {
  origin: ['http://localhost:3000', 'https://jeux-olympiques-2024-production.up.railway.app'],
  credentials: true // Enable credentials (cookies) in CORS
};

const saltRounds = 10;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'hello',
  resave: false,
  cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  saveUninitialized: false
}));

app.get('/offers', async (req, res) => {
  try {
    let query = `
      SELECT offers.*, COUNT(tickets.id) AS ticket_count
      FROM offers
      LEFT JOIN tickets ON offers.id = tickets.offerid
    `;
    
    const { active } = req.query;

    if (active) {
      const isActive = active.toLowerCase() === 'true';
      query += ` WHERE active = ${isActive}`;
    }

    query += ' GROUP BY offers.id';
    query += ' ORDER BY offers.price ASC'; // Sort by price ascending

    const offers = await db.any(query);
    res.json(offers);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error fetching offers');
  }
});

app.post('/offer', async (req, res) => {
  try {
    const { name, price, includedtickets, active } = req.body;

    if (!name || typeof price !== 'number' || typeof includedtickets !== 'number' || typeof active !== 'boolean') {
      return res.status(400).send('Invalid data provided');
    }

    // Generate a UUID for the offer
    const offerId = uuidv4();

    const query = 'INSERT INTO offers (id, name, price, includedtickets, active) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const newOffer = await db.one(query, [offerId, name, price, includedtickets, active]);
    
    res.status(201).json(newOffer);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error creating offer');
  }
});

app.patch('/offer/:id', async (req, res) => {
  try {
    const offerId = req.params.id;
    const { name, active } = req.body;

    // Check if name and active fields are provided
    if (!name && !active) {
      return res.status(400).json({ error: 'Name or active field must be provided for update' });
    }

    // Construct the SQL query based on provided fields
    const updateFields = [];
    const params = [];

    if (name) {
      updateFields.push('name = $1');
      params.push(name);
    }
    if (active !== undefined) {
      updateFields.push('active = $2');
      params.push(active);
    }

    // Update offer in the database
    const query = `
      UPDATE offers
      SET ${updateFields.join(', ')}
      WHERE id = $${params.length + 1}
      RETURNING *;
    `;
    params.push(offerId);

    const updatedOffer = await db.one(query, params);
    res.json(updatedOffer);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error updating offer');
  }
});

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

async function authenticate (username, password, fn) {
  const users = await db.any('SELECT * FROM users WHERE username = $1', [username]);

  if (users.length === 0) {
    // User not found
    return fn(null, null);
  }

  const user = users[0];
  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (passwordMatch) {
    // Passwords match
    return fn(null, user);
  } else {
    // Passwords do not match
    return fn(null, null);
  }
}

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy();
  res.status(200).send({ status: "success", message: 'Déconnecté' });
});

app.post('/login', async (req, res, next) => {
  await authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        res.status(200).send(user);
      });
    } else {
      req.session.error = 'Erreur de connexion, merci de vérifier votre nom d\'utilisateur et mot de passe.';
      res.status(401).send({ status: "error", message: req.session.error });
    }
  });
});

app.post('/user', async (req, res) => {
  try {
    const { username, firstname, lastname, email, password } = req.body;
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate a UUID for the user
    const userId = uuidv4();

    // Insert the user into the database
    await db.none('INSERT INTO users(id, username, firstname, lastname, email, password) VALUES($1, $2, $3, $4, $5, $6)',
      [userId, username, firstname, lastname, email, hashedPassword]);
    
    res.status(201).send({ status: "success", message: "Utilisateur crée" });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send({ status: "error", message: "Erreur sur la création d'utilisateur" });
  }
});

app.get('/user', async (req, res) => {
  // Check if session contains user data
  if (req.session && req.session.user) {
    try {
      const userId = req.session.user.id; // Assuming id is the primary key of the user table
      const user = await db.one('SELECT * FROM users WHERE id = $1', userId);
      res.json(user);
    } catch (error) {
      console.error('ERROR:', error);
      res.status(500).send('Error fetching user data');
    }
  } else {
    // Session not authenticated
    res.status(401).send('Non autorisé');
  }
});

app.post('/order', async (req, res) => {
  try {
    const { userId, basket } = req.body;

    // Generate a UUID for the order
    const orderId = uuidv4();

    const date = new Date();

    // Insert the order into the database
    await db.tx(async t => {
      // Insert the order
      await t.none('INSERT INTO orders (id, userid, date) VALUES ($1, $2, $3)', [orderId, userId, date]);

      // Insert tickets for each offer in the basket
      for (const offerId in basket) {
        const quantity = basket[offerId];
        // Create a ticket for each quantity
        for (let i = 0; i < quantity; i++) {
          const ticketId = uuidv4();
          await t.none('INSERT INTO tickets (id, orderid, userid, offerid) VALUES ($1, $2, $3, $4)', [ticketId, orderId, userId, offerId]);
        }
      }
    });

    // Fetch the created tickets from the database
    const createdTickets = await db.manyOrNone('SELECT * FROM tickets WHERE orderid = $1', [orderId]);

    res.status(201).json({ id: orderId, userid: userId, date, tickets: createdTickets });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId parameter is required' });
    }

    // Fetch orders for the given userId
    const orders = await db.manyOrNone('SELECT * FROM orders WHERE userid = $1', [userId]);

    // Fetch tickets for each order
    const ordersWithTickets = await Promise.all(orders.map(async (order) => {
      const tickets = await db.manyOrNone('SELECT * FROM tickets WHERE orderid = $1', [order.id]);
      return { ...order, tickets };
    }));

    res.json(ordersWithTickets);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error fetching orders');
  }
});

const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", function () {
  console.log(`Server listening on ${port}`);
});

module.exports = { app, db }