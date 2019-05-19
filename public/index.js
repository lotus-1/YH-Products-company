const querystring = require('query-string');
const fs = require('fs');
const path = require('path');
const productsList = path.readFile(__dirname, '..', 'src/static.js');
const form = document.getElementsById('form');
form.addEventListener('button', (event) => {
  event.preventDefault();
  fetch('/getCustomersData')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('This is the data: ', data);
  })
  .catch((error) => {
    console.log('This is an error: ', error);
  });
})
