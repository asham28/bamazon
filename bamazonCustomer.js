// DEPENDENCIES
var mysql = require("mysql");
var inquirer = require("inquirer");
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
    console.log("========================")
    console.log("connected as id " + connection.threadId);
    console.log("========================")

    displayInventory();

});

// =========================================
// FUNCTION AFTER CONNECTING TO MYSQL
// =========================================

// STEP 1: DISPLAY INVENTORY
function displayInventory() {
    var query = "SELECT item_id, product_name, price FROM products";

    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(consoleTable.getTable(response));
    });
}

// STEP 2: PROMPT USER 
setTimeout(customerQuery, 200);

function customerQuery() {

    inquirer.prompt([{
            type: "input",
            message: "See a product you like? Type in the ID to purchase.",
            name: "productID"
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "unitNum"
        }
    ]).then(function (answer) {
        var query = "SELECT * FROM products WHERE item_id= '" + answer.productID + "'";

        connection.query(query, function (err, response) {
            if (err) throw err;
            console.log("========================");
            console.log("You would like to buy " + answer.unitNum + " " + response[0].product_name + "(s). Processing...")
            console.log("\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.");


            // CONFIRM QUANTITY IN INVENTORY
            if (answer.unitNum > response[0].stock_quantity) {
                console.log("\n===============================");
                console.log("\nInsufficient quantity!");
                console.log("\n===============================");
            } else if (answer.unitNum <= response[0].stock_quantity) {

                console.log("\nOrder Successful!")

                // CALCULATING TOTAL PRICE FOR CUSTOMER
                var totalPrice = parseFloat(response[0].price) * parseFloat(answer.unitNum);
                console.log("\n===============================");
                console.log("\nYour total is: $", totalPrice, "\nThank you for shopping at Bamazon :) ");
                console.log("\n===============================");


                var quantity = parseInt(response[0].stock_quantity) - parseInt(answer.unitNum)

                query = "UPDATE products SET stock_quantity= " + quantity + " WHERE item_id= " + response[0].item_id + "";

                connection.query(query, function (err, response) {
                    if (err) throw err;
                });
            }
            connection.end();
        });
    });
}
