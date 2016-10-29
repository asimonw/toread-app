var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var BOOKS_FILE = path.join(__dirname, 'books.json');

var server = http.createServer(function (req, res) {
  var path = url.parse(req.url).path;
  switch (path) {
    case '/':
      res.end('<h1>homepage</h1>');
      break;
    case '/books':
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
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
        res.end(JSON.stringify(result));
      });
      break;
    default:
      res.end('not found');
  }
});

server.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});
