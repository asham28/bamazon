DROP DATABASE IF EXISTS bamazonDB; 

CREATE DATABASE bamazonDB; 

USE bamazonDB; 

CREATE TABLE products (
	item_id Int(100) auto_increment,  
	product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT, 
    PRIMARY KEY (item_id)
); 


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Table", "Furniture", 22.99, 10); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("Chair", "Furniture", 15.99, 10), 
				("Pillow", "Bedding", 40.95, 10), 
                ("Echo Dot", "Electronics", 59.99, 4), 
                ("USB Hub", "Electronics", 39.99, 5),
                ("Fitness Watch", "Electronics", 149.99, 10),
				("Mattress Protector", "Bedding", 21.99, 50),
                ("Oil Diffuser", "Home", 21.99, 30),
                ("Water Bottle", "Kitchen", 19.99, 20),
                ("Blender", "Kitche", 58.99, 10),
                ("Laptop", "Electronics", 449.99, 10);

SELECT *
FROM products ;



