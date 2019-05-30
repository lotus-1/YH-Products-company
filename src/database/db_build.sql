BEGIN;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customersProducts CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  address TEXT NULL,
  phone  VARCHAR(10) NOT NULL
);

INSERT INTO customers (full_name, address, phone) VALUES
  ('Hoda Mansoud', 'Osfia', 0501234567);
  INSERT INTO customers (full_name, address, phone) VALUES
  ('Jasmine Badrih', 'Daliat El Carmel', 0598765432);
  INSERT INTO customers (full_name, address, phone) VALUES
  ('Sahar Mansour', 'Osfia', 0524681357);

  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_category TEXT NOT NULL,
    product_price DECIMAL(6,2),
    product_quantity INTEGER DEFAULT 5000
  );

  INSERT INTO products (product_name, product_category, product_price, product_quantity) VALUES
    ('Retspaz', 'cleaning tools', 5, 20),
    ('Badeen', 'cleaning tools', 3, 22),
    ('pasta', 'food', 6, 6);

    CREATE TABLE customersProducts (
      customers_id INTEGER REFERENCES customers(id),
      products_id INTEGER REFERENCES products(id)
    );

COMMIT;
