const express = require('express');
const bodyParser = require('body-parser');

const bookRoute = require('./books');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/books', bookRoute);

module.exports = app;
