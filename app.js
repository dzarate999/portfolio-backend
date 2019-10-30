const express = require('express');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

const sendGrid = require('@sendGrid/mail');

const port = process.env.PORT || 3030;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api', (req, res, next) => {
  res.send('API Status: Running');
});

//USING sendGrid
app.post('/api/email', (req, res, next) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'daniel@zarate.org',
    from: req.body.email,
    subject: 'Portfolio Contact',
    text: req.body.message,
  };

  sendGrid
    .send(msg)
    .then(result => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(err => {
      console.log('error: ', err);
      res.status(401).json({
        success: false,
      });
    });
});

app.listen(port);
