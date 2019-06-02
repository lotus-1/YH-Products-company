const handlers = require("./handlers");
const { parse } = require('url');
const { readFile } = require('fs');

const router = (request, response) => {
  if (request.url === "/") {
    handlers.handlerHome(request, response);
  } else if (request.url.indexOf("/public") !== -1) {
    handlers.handlerPublic(request, response, request.url);
  } else if (request.url.indexOf("/get") !== -1) {
    handlers.handlerGetDB(response);
  } else if (request.url.indexOf("/post") !== -1) {
    handlers.handlerPostDB(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("<h1> 404, Page Not Found</h1>");
  };
};

const cookieLogin = (req, res) => {
  switch (`${req.method} ${req.url}`) {
    // case 'GET /':
    //   return readFile('./index.html',
    //     (err, data) => {
    //       res.writeHead(200,{ 'Content-Type': 'text/html' });
    //       return res.end(data);
    //     }
    //   );
    case 'post /login':
      res.writeHead(302,{ 'Location': '/','Set-Cookie': 'logged_in=true; HttpOnly'});
      return res.end();
      default:
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('<h1>Page not found</h1>');
    }
// const cookieLogOut =  (req, res) => {
//   switch (`${req.method} ${req.url}`) {
    // case 'post /logout':
    //   res.writeHead(
    //     302,
    //     {
    //       'Location': '/',
    //       'Set-Cookie': 'logged_in=0; Max-Age=0'
    //     }
    //   );
    //   return res.end();
//   }

const cookieSignUp = (req, res) => {
  switch (`${req.method} ${req.url}`) {
    case 'post /signup':
      if (req.headers.cookie && req.headers.cookie.match(/logged_in=true/)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end('Logged in successfully!');
      } else {
        res.writeHead(401, { 'Content-Type': 'text/html' });
        return res.end('Logged in falied!');
      }
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>Page not found</h1>');
    };
  }


module.exports = {
  router,
  cookieLogin,
  cookieSignUp
}

