var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
  var path = url.parse(req.url).path;
  var result;
  switch (path) {
    case '/':
      result = 'homepage';
      break;
    case '/about':
      result = 'about';
      break;
    default:
      result = 'not found';
  }
  res.end(result);
});

server.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});
