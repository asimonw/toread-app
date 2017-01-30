var app = require('./server');
var {mongoose} = require('./server/db/mongoose');
var {Book} = require('./server/models/book');

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
