// DEPENDENCIES 
var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require('console.table');
require("dotenv").config();

// CONNECTION TO MYSQL DATABASE
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("======================================")
    console.log("connected as id " + connection.threadId);
    console.log("======================================")

    managerQuery();

});

// =========================================
// FUNCTION AFTER CONNECTING TO MYSQL
// =========================================

// MANAGER VIEW OPTIONS
function managerQuery() {

    inquirer.prompt([{
        type: "list",
        choices: [
            "View products for sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ],
        name: "managerOptions"

    }]).then(function (answer) {

        var choice = answer.managerOptions;

        switch (choice) {
            case 'View products for sale':
                viewProducts()
                break;

            case 'View Low Inventory':
                lowInventory()
                break;

            case 'Add to Inventory':
                addInventory()
                break;

            case 'Add New Product':
                addProdcut()
                break;

            default:
                console.log("There's been an error.");

        };
    });
}


// VIEW PRODUCTS FUNCTION
function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(consoleTable.getTable(response));
        connection.end();
    })
};


// VIEW LOW INVENTORY FUNCTION
function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity <5 ";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(consoleTable.getTable(response));
        connection.end();
    })
};


// ADD TO INVENTORY FUNCTION
function addInventory() {
    inquirer.prompt([{
            type: "input",
            message: "Please select the item to restock by item ID.",
            name: "productID"
        },
        {
            type: "input",
            message: "What should the total stock number be?",
            name: "addUnits"
        }
    ]).then(function (answer) {

        var query = "UPDATE products SET stock_quantity= " + answer.addUnits + " WHERE item_id=" + answer.productID + "";

        connection.query(query, function (err, response) {
            if (err) throw err;
            console.log("\n========================")
            console.log("\nStock has been added.");
            console.log("\n========================")

            viewProducts();
        })
    })
};

// ADD NEW PRODUCT FUNCTION
function addProdcut() {
    inquirer.prompt([{
            type: "input",
            message: "Item Id (must be unique)",
            name: "itemID"
        },
        {
            type: "input",
            message: "Name of Product",
            name: "name"
        },
        {
            type: "input",
            message: "Department Name",
            name: "department"
        },
        {
            type: "input",
            message: "Price",
            name: "price"
        },
        {
            type: "input",
            message: "Stock Quantity",
            name: "stock"
        }
    ]).then(function (answer) {

        var query = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (" + answer.itemID + ", '" + answer.name + "' , '" + answer.department + "' ," + answer.price + ", " + answer.stock + ")"

        connection.query(query, function (err, response) {
            if (err) throw err;
            console.log("Stock has been added.");
            viewProducts();
        })
    })
};