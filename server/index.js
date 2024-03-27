
const express = require('express');
const app = express();
const cors = require('cors');
const pgp = require('pg-promise')();
require('dotenv').config();

const PGUSER = process.env.PGUSER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const RAILWAY_TCP_PROXY_DOMAIN = process.env.RAILWAY_TCP_PROXY_DOMAIN;
const RAILWAY_TCP_PROXY_PORT = process.env.RAILWAY_TCP_PROXY_PORT;
const PGDATABASE = process.env.PGDATABASE;
const db = pgp(`postgresql://${PGUSER}:${POSTGRES_PASSWORD}@${RAILWAY_TCP_PROXY_DOMAIN}:${RAILWAY_TCP_PROXY_PORT}/${PGDATABASE}`)

app.use(cors())

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

const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", function () {
    console.log(`Server listening on ${port}`);
});