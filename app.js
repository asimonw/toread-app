const app = require('./server');

const server = app.listen(8080, () => {
  console.log("Listening on port " + server.address().port);
});
