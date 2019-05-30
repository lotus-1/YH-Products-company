const handlers = require("./handlers");
const { parse } = require('url');
const { readFile } = require('fs');

const router = (request, response) => {
  if (request.url === "/") {
    handlers.handlerHome(request, response);
  } else if (request.url.indexOf("/public") !== -1) {
    handlers.handlerPublic(request, response, request.url);
  } else if (request.url.indexOf("/getCustomersData") !== -1) {
    handlers.handlerGetDB(response);
  } else if (request.url.indexOf("/postCustomersData") !== -1) {
    handlers.handlerPostDB(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("<h1> 404, Page Not Found</h1>");
  };
};

const cookiesLog = (req, res) => {
  switch (`${req.method} ${req.url}`) {
    case 'GET /':
    return readFile('./index.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    case 'post /login':
    res.writeHead(302, { 'Location': '/', 'Set-Cookie': 'logged-_in=true; HttpOnly' });
    res.end();

    // case 'post /logout':

      break;
    default:

  }
}

module.exports = router;
