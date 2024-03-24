
const express = require('express');
const app = express();
const cors = require('cors');

// Fake data
const fakeData = {
  offerIds: ['1', '2'],
  offerEntities: {
    1: { id: 1, name: 'Fake offer 1' },
    2: { id: 2, name: 'Fake offer 2' },
  }
};

app.use(cors())

app.get('/offers', (req, res) => {
  // Sending fake data as JSON response
  res.json(fakeData);
});

app.listen(process.env.PORT || 8080, () => {
      console.log('server listening on port 8080')
})