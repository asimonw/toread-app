var app = require('./server');

var server = app.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});
