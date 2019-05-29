const path = require("path");
const fs = require("fs");
const querystring = require("query-string");
const url = require("url");

const getCustomersData = require("./queries/getCustomersData.js");
const postCustomersData = require("./queries/postCustomersData.js");

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
  getCustomersData((err, customers) => {
    if (err) throw new Error(" The getCustomersData have an ERROR: ", err);
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
    const parseAddress = querystring.parse(data).address;
    const parsePhone = querystring.parse(data).phone;

    postCustomersData(parseFullName, parseAddress, parsePhone, (err, res) => {
      if (err) {
        console.log("The postCustomersData have an Error: ", err);
        // throw new Error("The postCustomersData have an Error: ", err);

      }
      response.writeHead(302, { 'Location': '/' });
      response.end(parseFullName, parseAddress, parsePhone);
    });
  });
};

module.exports = {
  handlerHome,
  handlerPublic,
  handlerGetDB,
  handlerPostDB
};
