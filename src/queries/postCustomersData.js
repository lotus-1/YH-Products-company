const dbConnection = require("../database/db_connection.js");

const postCustomersData = (full_name, address, phone, cb) => {
  dbConnection.query(
    "INSERT INTO customers (\"full_name\", \"address\", \"phone\") VALUES ($1, $2, $3)",
    [full_name, address, phone],
    (err, res) => {
      // if (err) throw new Error("This is an Error in postCustomersData: ", err);
      // cb(null, res);
      if (err) {
        // console.log('this is an error in postCustomersData: ', err);
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = postCustomersData;
