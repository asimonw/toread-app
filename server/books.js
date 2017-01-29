var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Promise = require('bluebird');

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

// promisify fs.writeFile 
function writeFile(filename, books) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(filename, JSON.stringify(books, null, 2), function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
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
  .put(function (req, res) {
    var id = parseInt(req.params.id, 10);
    var books = req.books;
    res.book = req.body || {};
    if (books) {
      var bookIndex = _.findIndex(books, { id: id});
      if (bookIndex > -1) {
        _.assign(books[bookIndex], res.book);
        writeFile(BOOKS_FILE, books)
          .then(function (data) {
            console.log("Book updated");
          })
          .catch(function (err) {
            console.error(err);
            req.books = null;
          })
          .finally(function () {
            res.json(res.book);
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
        writeFile(BOOKS_FILE, filteredBooks)
          .then(function (data) {
            console.log("Book removed from list");
            res.book.id = id;
          })
          .catch(function (err) {
            console.error(err);
            req.books = null;
          })
          .finally(function () {
            res.json(res.book);
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