var app = require('./server');

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/ToreadApp');

var BookSchema = {
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

var Book = mongoose.model('Book', BookSchema);
var toread = new Book({
  author: 'Nick Bostrom',
  title: 'Superintelligence'
});

toread.save()
  .then(function (doc) {
    console.log('Book saved', JSON.stringify(doc, undefined, 2));
  })
  .catch(function (e) {
    console.log('Unable to save book', e);
  });

// var server = app.listen(8080, function () {
//   console.log("Listening on port " + server.address().port);
// });
