const express = require('express');
const bodyParser = require('body-parser');

const apiRoute = require('./api');
const app = express();

app.use(express.static('public', { extensions: ['html'] }));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', apiRoute);

module.exports = app;
