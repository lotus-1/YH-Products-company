const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const url = require('url');

const getCustomersData = require('./queries/getCustomersData.js');
const postCustomersData = require('./queries/postCustomersData.js');

const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    response.writeHead(500, { 'Content-Type': 'text/html' });
    response.end('<h1> Sorry, You have an Error </h1>');
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  });
};

const publicHandler = (request, response, url) => {
  const extension = url.split('.')[1];
  const extensionTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon'
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (err, file) => {
    if (err){
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry , Can\'t find the file </h1>');
    } else {
      response.writeHead(200, { 'Content-type': extensionType[extension] });
      response.end(file);
    }
  });
};

const handlerGetDb = (response) => {
  console.log('this is the response in the handlerGetDB: ', response);
    getUserData((err, students) => {
      console.log('this is the students : ', students);
      if (err) return serverError(err, response);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(students));
    });
};

module.exports = {
  handlerHome,
  handlerPublic,
  handlerGetDb,
  handlerPostDB
}



//
// const handlerPostDB = ((request, response) => {
//   console.log('this is the request url: ', request.url);
//   let data = '';
//   request.on('data', chunk => {
//     data += chunk;
//     console.log('this is the data after chunk : ', data.split('&'));
//   });
//   request.on('end', () => {
//     // console.log('the data', data);
//     const parseFirstName = querystring.parse(data).first_name;
//     const parseLastName = querystring.parse(data).last_name;
//     console.log('the parseData', parseFirstName);
//     console.log('the parseData', parseLastName);
//
//     postUserData(parseFirstName, parseLastName, (err, res) => {
//       console.log('res', res);
//       if (err) return serverError(err, response);
//       response.writeHead(302, { 'Location': '/' });
//       response.end(parseFirstName,parseLastName);
//     });
//   });
// });
//
