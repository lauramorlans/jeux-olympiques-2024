
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');
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

// GET /offers endpoint
app.get('/offers', async (req, res) => {
  try {
    const offers = await db.any('SELECT * FROM offers');
    res.json(offers);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error fetching offers');
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

    // Insert the user into the database
    await db.none('INSERT INTO users(username, firstname, lastname, email, password) VALUES($1, $2, $3, $4, $5)',
      [username, firstname, lastname, email, hashedPassword]);
    
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

const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", function () {
  console.log(`Server listening on ${port}`);
});