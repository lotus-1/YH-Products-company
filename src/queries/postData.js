const dbConnection = require('../database/db_connection.js');

const postData = (fullName, cb) => {
  dbConnection.query(
    'INSERT INTO users (fullName) VALUES ($1)',
    [name, location],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;
