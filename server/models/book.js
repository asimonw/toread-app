const mongoose = require('mongoose');

const BookSchema = {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  author: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
};

const Book = mongoose.model('Book', BookSchema);

module.exports = {Book};
