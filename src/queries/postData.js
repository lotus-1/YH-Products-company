const dbConnection = require('../database/db_connection.js');

const postData = (full_name, cb) => {
  dbConnection.query(
    'INSERT INTO clients (full_name) VALUES ($1)',
    [name, location],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;
