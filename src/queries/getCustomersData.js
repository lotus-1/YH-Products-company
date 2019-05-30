const dbConnection = require("../database/db_connection.js");

const getCustomersData = cb => {
  dbConnection.query("SELECT * FROM customers", (err, res) => {
    console.log('getCustomersData: ', res);
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

module.exports = getCustomersData;
