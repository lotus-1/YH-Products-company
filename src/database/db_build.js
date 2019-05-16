const fs = require('fs');
const dbConnection = require('./db_connection');

if(!process.env.DB_URL) throw new Error('Enviroment varibal DB_URL must be sent!');
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log("clients table created with result: ", res);
});
