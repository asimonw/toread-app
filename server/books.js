const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {ObjectId} = require('mongodb');
const {Book} = require('./models/book');
const bookRoute = require('express').Router();

bookRoute.route('/')
  .get((req, res) => {
    Book.find()
      .then(books => {
        res.send({books})
      })
      .catch(e => {
        res.status(400).send();
      });
  })
  .post((req, res) => {
    let book = new Book({
      author: req.body.author,
      title: req.body.title
    });

    book.save()
      .then(book => {
        res.send({book});
      })
      .catch(e => {
        res.status(400).send();
      });
  });

bookRoute.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(404).send();
    }
    Book.findById(id)
      .then(book => {
        if (!book) {
          res.status(404).send();
        }
        res.send({book});
      })
      .catch(e => {
        res.status(400).send();
      });
  })
  .put((req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(404).send();
    }
    let body = _.pick(req.body, ['title', 'author', 'completed']);

    Book.findByIdAndUpdate(id, {$set: body}, {new: true})
      .then(book => {
        if (!book) {
          res.status(404).send();
        }
        res.send({book});
      })
      .catch(e => {
        res.status(400).send();
      });
  })
  .delete((req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(404).send();
    }
    Book.findByIdAndRemove(id)
      .then(book => {
        if (!book) {
          res.status(404).send();
        }
        res.send({book});
      })
      .catch(e => {
        res.status(400).send();
      });
  });

  module.exports = bookRoute;
