const http = require('http');
const router = require('./router.js');
console.log('server');
const hostname = process.env.PORT || 'localhost';
const port = process.env.PORT || 4000;

http.createServer(router).listen(port, () => {
  console.log(`I am working on http://${hostname}: ${port}`);
});
