var express = require('express');
var bodyParser = require('body-parser');

var bookRoute = require('./books');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/books', bookRoute);

module.exports = app;
