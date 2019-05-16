const dbConnection = require('../database/db_connection.js');

const getCustomersData = cb => {
  dbConnection.query('SELECT * FROM customers', (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
});
const getProductsData = cb => {
  dbConnection.query('SELECT * FROM products', (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
});
const getCustomersProductsData = cb => {
  dbConnection.query('SELECT * FROM customersProducts', (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
});
};

module.exports = getData;
