const dbConnection = require("../database/db_connection.js");

const get = cb => {
  dbConnection.query("SELECT * FROM customers", (err, res) => {
    console.log('get: ', res);
    if (err) return cb(err);
    cb(null, res.rows);
  });
};


module.exports = get;
