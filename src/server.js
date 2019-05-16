const http = require('http');
const router = require('./router');

const hostname = process.env.PORT || 'localhost';
const port = process.env.PORT || 5000;

http.createServer(router).listen(port, () => {
  console.log(`I am working on http://${hostname}: ${port}`);
});
