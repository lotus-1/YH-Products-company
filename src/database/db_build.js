const fs = require('fs');
const path = require('path');
console.log('db_build.js');
const dbConnection = require('./db_connection.js');

if(!process.env.DB_URL) throw new Error('Enviroment varibal DB_URL must be sent!');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log("customers table created with result: ", res);
});

const runDbBuild = cb => dbConnection.query(sql, cb);

module.exports = runDbBuild;
