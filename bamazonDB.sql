DROP DATABASE IF EXISTS bamazonDB; 

CREATE DATABASE bamazonDB; 

USE bamazonDB; 

CREATE TABLE products (
	item_id Int(100) NOT NULL,  
	product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT, 
    product_sales  DECIMAL(10,2),
    PRIMARY KEY (item_id)
); 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Table", "Furniture", 22.99, 10); 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 	(2, "Chair", "Furniture", 15.99, 10), 
				(3, "Pillow", "Bedding", 40.95, 10), 
                (4, "Echo Dot", "Electronics", 59.99, 4), 
                (5, "USB Hub", "Electronics", 39.99, 5),
                (6, "Fitness Watch", "Electronics", 149.99, 10),
				(7, "Mattress Protector", "Bedding", 21.99, 50),
                (8, "Oil Diffuser", "Home", 21.99, 30),
                (9, "Water Bottle", "Kitchen", 19.99, 20),
                (10, "Blender", "Kitchen", 58.99, 10),
                (11, "Laptop", "Electronics", 449.99, 10);

