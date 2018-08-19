// DEPENDENCIES 
var inquirer = require("inquirer");
var mysql = require("mysql");
require("dotenv").config();


// CONNECT TO MYSQL DATABASE
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

// MANAGER VIEW 
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

        };
    });
}


// VIEW PRODUCTS FUNCTION
function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(response);
        connection.end();
    })
};


// VIEW LOW INVENTORY FUNCTION
function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity <5 ";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(response);
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
            message: "How many more units would you like to order",
            name: "addUnits"
        }
    ]).then(function (answer) {

        var query = "UPDATE products SET stock_quantity= " + answer.addUnits + " WHERE item_id=" + answer.productID + "";
        console.log(query);

        connection.query(query, function (err, response) {
            if (err) throw err;
            console.log("Stock has been added.");
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

        var query = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (" + answer.itemID + ", '" + answer.name + "' , '" + answer.department + "' ,"  + answer.price + ", " + answer.stock + ")"
        console.log(query);

        connection.query(query, function (err, response) {
            if (err) throw err;
            console.log("Stock has been added.");
            viewProducts();
        })
    })
};