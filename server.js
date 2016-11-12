var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var app = express();
var booksRoute = express.Router();

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

booksRoute.get('/', getBooks, function (req, res) {
  var books = req.books;
  if (books) {
    res.json(books);
  } else {
    res.json([]);
  }
});

booksRoute.get('/:id', getBooks, function (req, res) {
  var id = parseInt(req.params.id, 10);
  var books = req.books;
  if (books) {
    var book = _.find(books, { id: id});
    res.json(book || {});
  } else {
    res.json({});
  }
});

booksRoute.post('/', function (req, res) {
  var book = req.body;
  res.json(book)
});

app.use('/books', booksRoute);

var server = app.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});
