const { readFile } = require('fs');
const path = require('path');
// const qs = require('qs');

const getData = require('./queries/getData.js');
const postData = require('./queries/postData.js');

const serverError = (err, response) => {
  response.writeHead(500, {'Content-Type': 'text/html'});
  response.end('<h1>There is an error in our website, try later...</h1>');
  console.log(err);
};

const homeHandler = response => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  readFile(filePath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, {'Content-Type': 'text/html' });
    response.end(file);
  });
};

const clientNameHandler = response => {
  getData((err, clients) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(clients));
  });
};

const postProductHandler = (request, response) => {
  let products = '';
  request.on('products', chunk => {
    products += chunck;
  });
  request.on('end', () => {
    const { name } = qs.parse(products);
    postData(name, err => {
      if (err) return serverError(err, response);
      response.writeHead(302, { 'products': '/' });
      response.end();
    });
  });
};

const publicHandler = (url, response) => {
  const filePath = path.join(__dirname, '..', url);
  readFile(filePath, (err, file) => {
    if (err) return serverError(err, response);
    const [, extension] = url.split('.');
    const extensionType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      ico: 'image/x-icon'
    };
    response.writeHead(200, { 'content-type': extensionType[extension] });
    response.end(file);
  });
};

const errorHandler = response => {
  response.writeHead(404, { 'content-type': 'text/html' });
  response.end('<h1>404 Page Requested Cannot be Found</h1>');
};

module.exports = {
  homeHandler,
  postProductHandler,
  publicHandler,
  errorHandler
};
