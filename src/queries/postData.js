const dbConnection = require('../database/db_connection.js');

const postCustomersData = (full_name, address, phone,, cb) => {
  dbConnection.query(
    'INSERT INTO clients (full_name, address, phone) VALUES ($1, $2, $3)',
    [full_name, address, phone],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postCustomersData;
