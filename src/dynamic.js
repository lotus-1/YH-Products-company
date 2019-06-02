const dbConnection = require('../database/db_connection');
const getProducts = cb => {
  dbConnection.query('SELECT * FROM products;', (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};
console.log('dynamic');
module.exports = getProducts;
