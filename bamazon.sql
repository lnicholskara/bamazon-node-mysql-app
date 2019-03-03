DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    consumer_price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, consumer_price, stock_quantity)
VALUES("T-shirt dress", "clothing", 19.95, 50), ("Sequence", "toys and games", 24.99, 20), ("Red race car", "toys and games", 4.65, 32), ("Men's jean overalls", "clothing", 32.94, 14), ("Pot and pan set", "household", 55.23, 7), ("Star Wars T-shirts", "clothing", 23.34, 28), ("TV Set", "electronics", 493.45, 3), ("Quilted bedspread", "household", 43.78, 11), ("Nintendo Switch", "electronics", 329.98, 1), ("Denim skirt", "clothing", 16.23, 19), ("Clock radio", "electronics", 23.34, 34), ("Men's suit jacket", "clothing", 67.23, 8);

SELECT * FROM products;