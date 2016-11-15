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

booksRoute.use(getBooks);

booksRoute.route('/')
  .get(function (req, res) {
    var books = req.books;
    if (books) {
      res.json(books);
    } else {
      res.json([]);
    }
  })
  .post(function (req, res) {
    var books = req.books;
    var book = req.body || {};

    var bookIds = books.map(function (book) {
      return book.id;
    });
    var maxId = Math.max.apply(Math, bookIds);

    books.push({
      id: maxId + 1,
      author: book.author || 'Unknown author',
      title: book.title || 'Unknown title'
    });
    fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), function (error) {
      if (error) {
        console.error(error);
        book.error = true;
      } else {
        console.log("Book added to list");
      }
    });
    res.json(book);
  });

booksRoute.get('/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var books = req.books;
  if (books) {
    var book = _.find(books, { id: id});
    res.json(book || {});
  } else {
    res.json({});
  }
});

app.use('/books', booksRoute);

var server = app.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});
