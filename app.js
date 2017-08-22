// connect mongoose
require('./server/db/mongoose');

const app = require('./server/server');

const server = app.listen(8080, () => {
  console.log("Listening on port " + server.address().port);
});
