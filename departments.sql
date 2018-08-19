DROP DATABASE IF EXISTS bamazonDB; 

CREATE DATABASE bamazonDB; 

USE bamazonDB; 

CREATE TABLE departments (
	department_id Int(100) NOT NULL,  
	department_name VARCHAR(100),
    over_head_costs INT(100),
    PRIMARY KEY (department_id)
); 


INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (1, "Home", 30); 


