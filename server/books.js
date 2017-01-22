var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var bookRoute = require('express').Router();

var BOOKS_FILE = path.join(__dirname, '/../books.json');

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

function saveBooks(res, books, callback) {
  fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), function (error) {
    if (error) {
      console.error(error);
      res.book.error = true;
    } else {
      callback();
    }
    res.json(res.book);
  });
}

bookRoute.use(getBooks);

bookRoute.route('/')
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
    res.book = req.body || {};

    var bookIds = books.map(function (book) {
      return book.id;
    });
    var maxId = Math.max.apply(Math, bookIds);

    books.push({
      id: maxId + 1,
      author: res.book.author || 'Unknown author',
      title: res.book.title || 'Unknown title'
    });
    saveBooks(res, books, function () {
      console.log("Book added to list");
    });
  });

bookRoute.route('/:id')
  .get(function (req, res) {
    var id = parseInt(req.params.id, 10);
    var books = req.books;
    if (books) {
      var book = _.find(books, { id: id});
      res.json(book || {});
    } else {
      res.json({});
    }
  })
  .delete(function (req, res) {
    var id = parseInt(req.params.id, 10);
    var books = req.books;
    res.book = {};

    if (books) {
      var filteredBooks = books.filter(function (book) {
        return book.id !== id;
      });
      if (filteredBooks.length !== books.length) {
        saveBooks(res, filteredBooks, function () {
          console.log("Book removed from list");
          res.book.id = id;
        });
      } else {
        console.log('No book with id', id);
        res.book.error = true;
        res.json(res.book);
      }
    } else {
      console.log('No book with id', id);
      res.book.error = true;
      res.json(res.book);
    }
  });

  module.exports = bookRoute;
