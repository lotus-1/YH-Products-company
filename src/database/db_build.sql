BEGIN;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS prodcuts CASCADE;
DROP TABLE IF EXISTS clientsProducts CASCADE;

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(50) NOT NULL,
  adress TEXT(100) NOT NULL,
  phone VARCHAR(15),
  email NVARCHAR(320) NOT NULL
);

INSERT INTO clients (full_name, adress, phone, email) VALUES
  ('Hoda Mansour ', 'Osfia', 0501234567, 'hoda_mansour164@gmail.com'),
  ('Jasmine Badrih', 'Daliat El Carmel', 0598765432, 'Jasmine154@hotmail.com'),
  ('Sahar Mansour', 'Osfia', 0524681357, 'Sahar.mans@walla.co.il');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  produc_name VARCHAR(100) NOT NULL,
  product_category VARCHAR(100) NOT NULL,
  product_price decimal(6,2) NOT NULL,
  product_quantity INTEGER DEFAULT 2000
);

INSERT INTO products (produc_name, product_category, product_price, product_quantity) VALUES
  ('cup 2oz', 'kitchen', 3, 1500),
  ('coffee', 'food', 35, 500),
  ('colgate', 'bath room', 12, 695);

CREATE TABLE clientsProducts (
  clients_id SERIAL PRIMARY KEY,
  products_id SERIAL PRIMARY KEY
);

COMMIT;
