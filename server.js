var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

var BOOKS_FILE = path.join(__dirname, 'books.json');

app.get('/books', function (req, res) {
  fs.readFile(BOOKS_FILE, function (error, data) {
    var result = {};
    if (error) {
      console.error(error);
      result.success = false;
      result.errorMessage = "Unable to get books";
      result.data = null;
    } else {
      var books = JSON.parse(data);
      result.success = true;
      result.errorMessage = "";
      result.data = books;
    }
    res.json(result);
  });
});

var server = app.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});
