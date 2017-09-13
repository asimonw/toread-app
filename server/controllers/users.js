const _ = require('lodash')
const {ObjectId} = require('mongodb')

const User = require('../models/user')

exports.get = (req, res) => {
  User.find()
    .then(users => {
      res.send({users})
    })
    .catch(e => {
      res.status(400).send()
    })
}

exports.post = (req, res) => {
  let user = new User({
    email: req.body.email,
    password: req.body.password
  })

  user.save()
    .then(user => {
      res.send({user})
    })
    .catch(e => {
      res.status(400).send()
    })
}

exports.getOne = (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send()
  }
  User.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).send()
      }
      res.send({user})
    })
    .catch(e => {
      res.status(400).send()
    })
}

exports.put = (req, res) => {
  let id = req.params.id
  if (!ObjectId.isValid(id)) {
    res.status(404).send()
  }
  let body = _.pick(req.body, ['email', 'password'])

  User.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(user => {
      if (!user) {
        res.status(404).send()
      }
      res.send({user})
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
  User.findByIdAndRemove(id)
    .then(user => {
      if (!user) {
        res.status(404).send()
      }
      res.send({user})
    })
    .catch(e => {
      res.status(400).send()
    })
}
