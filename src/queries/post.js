const dbConnection = require("../database/db_connection.js");

const post = (full_name, address, phone, cb) => {
  console.log(`full_name= ${full_name}, address=${address}, phone=${phone}`);
  dbConnection.query(
    `INSERT INTO customers (full_name, address, phone) VALUES ($1, $2, $3)`,
    [full_name, address, phone],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = post;
