var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var app = express();

var BOOKS_FILE = path.join(__dirname, 'books.json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function getBooks(req, res, next) {
  fs.readFile(BOOKS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      req.books = null;
    } else {
      req.books = JSON.parse(data);
    }
    next();
  });
}

app.get('/books', getBooks, function (req, res) {
  var books = req.books;
  if (books) {
    res.json(books);
  } else {
    res.json([]);
  }
});

app.get('/books/:id', getBooks, function (req, res) {
  var id = parseInt(req.params.id, 10);
  var books = req.books;
  if (books) {
    var book = _.find(books, { id: id});
    res.json(book || {});
  } else {
    res.json({});
  }
});

var server = app.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});
