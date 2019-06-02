const path = require("path");
const fs = require("fs");
const querystring = require("query-string");
const url = require("url");
const bcrypt = require('bcryptjs');
const get = require("./queries/get.js");
const post = require("./queries/post.js");
console.log('handlers');
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
  get((err, customers) => {
    if (err) {
      console.log("this is the get error: ", err);
    }
    // throw new Error(" The get have an ERROR: ", err);
    console.log("else statement in get: ", customers);
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
      response.writeHead(302, { Location: "/" });
      response.end(parseFullName, parseaddress, parsephone);
    });
  });
};

const handlerLgIn = (request, response) => {
    var body = '';
    request.on('data', (data) => {
      body += data.toString();
    });
    request.on('end', () => {
      const { email, password } = qs.parse(body)
      queries.get(email, (err, passwordInDb) => {
        if (err) {
          res.statusCode = 500;
          res.end('Error logging in...')
        }
        if (!passwordInDb) {
          res.statusCode = 403;
          res.end('Oooooooppppppsssss, no details match that user');
        }
        bcrypt.compare(password, passwordInDb, (err, passwordMatch) => {
          if (err) {
            res.statusCode = 500;
            res.end('<h1>ERROR</h1>');
          } else if (!passwordMatch) {
            res.statusCode = 403;
            res.end('Password doesn\'t match the username');
          }
          res.statusCode = 200;
          res.end('Welcome to the club!')
        });
      })
    })
}

module.exports = {
  handlerHome,
  handlerPublic,
  handlerGetDB,
  handlerPostDB
}
