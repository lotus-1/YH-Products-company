const path = require("path");
const fs = require("fs");
const querystring = require("query-string");
const url = require("url");

const get = require("./queries/get.js");
const post = require("./queries/post.js");

const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1> Sorry, You have an Error </h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

const handlerPublic = (request, response, url) => {
  const extension = url.split(".")[1];
  const extenstionTypes = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon"
  };
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1> Sorry , Can't find the file </h1>");
    } else {
      response.writeHead(200, { "Content-type": extenstionTypes[extension] });
      response.end(file);
    }
  });
};

const handlerGetDB = response => {
  console.log('12345');
  get((err, customers) => {
    if (err) {
      console.log('this is the get error: ', err);

    }
    // throw new Error(" The get have an ERROR: ", err);
    console.log('else statement in get: ', customers);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(customers));
  });
};

const handlerPostDB = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const parseFullName = querystring.parse(data).full_name;
    const parseaddress = querystring.parse(data).address;
    const parsephone = querystring.parse(data).phone;

    get(parseFullName, parseaddress, parsephone, (err, res) => {
      if (err) {
        console.log("The get have an Error: ", err);
        // throw new Error("The get have an Error: ", err);

      }
      response.writeHead(302, { 'Location': '/' });
      response.end(parseFullName, parseaddress, parsephone);
    });
  });
};

module.exports = {
  handlerHome,
  handlerPublic,
  handlerGetDB,
  handlerPostDB
};
