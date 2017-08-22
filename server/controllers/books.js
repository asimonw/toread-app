const _ = require('lodash');
const {ObjectId} = require('mongodb');

const Book = require('../models/book')

exports.get = (req, res) => {
  Book.find()
    .then(books => {
      res.send({books})
    })
    .catch(e => {
      res.status(400).send()
    })
}

exports.post = (req, res) => {
  let book = new Book({
    author: req.body.author,
    title: req.body.title
  })

  book.save()
    .then(book => {
      res.send({book})
    })
    .catch(e => {
      res.status(400).send()
    });
}

exports.getOne = (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send()
  }
  Book.findById(id)
    .then(book => {
      if (!book) {
        res.status(404).send()
      }
      res.send({book})
    })
    .catch(e => {
      res.status(400).send()
    });
}

exports.put = (req, res) => {
  let id = req.params.id
  if (!ObjectId.isValid(id)) {
    res.status(404).send()
  }
  let body = _.pick(req.body, ['title', 'author', 'completed'])

  Book.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(book => {
      if (!book) {
        res.status(404).send()
      }
      res.send({book})
    })
    .catch(e => {
      res.status(400).send()
    })
}

exports.delete = (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send()
  }
  Book.findByIdAndRemove(id)
    .then(book => {
      if (!book) {
        res.status(404).send()
      }
      res.send({book})
    })
    .catch(e => {
      res.status(400).send()
    })
}
