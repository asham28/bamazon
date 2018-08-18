// LEFT TO DO
// 2. MAKE THE DISPLAY INVENTORY MORE CUSTOMER FRIENDLY
// 3. CREATE DRY CODE


// STEP UP REQUIRED MODUELS
var mysql = require("mysql");
var inquirer = require("inquirer");
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
    console.log("========================")
    console.log("connected as id " + connection.threadId);
    console.log("========================")

    displayInventory();
    // customerQuery();

});

// =========================================
// FUNCTION AFTER CONNECTING TO MYSQL
// =========================================

//STEP 1: DISPLAY INVENTORY
function displayInventory() {

    var query = "SELECT item_id, product_name, price FROM products";

    connection.query(query, function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
    });
}

// STEP 2: PROMPT USER WITH TWO MESSAGES
// The first should ask them the ID of the product they would like to buy.


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
        // RUNS QUERY AND GIVES USER BACK SOME INFO
        var query = "SELECT * FROM products WHERE item_id= '" + answer.productID + "'";

        connection.query(query, function (err, response) {
            if (err) throw err;
            console.log("========================");
            console.log("You would like to buy " + answer.unitNum + " " + response[0].product_name + "(s). Processing.")

            //--------------
            // console.log("Answer.unitNum: ", answer.unitNum);
            // console.log("Stock quantity: ", response[0].stock_quantity);


            // CONFIRM QUANTITY IN INVENTORY

            if (answer.unitNum > response[0].stock_quantity) {
                console.log("Insufficient quantity!")
            } else if (answer.unitNum <= response[0].stock_quantity) {
                console.log("Your order is being processed!")

                // CALCULATING TOTAL PRICE FOR CUSTOMER
                var totalPrice = parseFloat(response[0].price)*parseFloat(answer.unitNum); 
                console.log("===============================");
                console.log("Your total is: $", totalPrice);    
                console.log("===============================");
             

                var quantity = parseInt(response[0].stock_quantity) - parseInt(answer.unitNum)
                
                 // updateInventory(); 
                query = "UPDATE products SET stock_quantity= " + quantity + " WHERE item_id= " + response[0].item_id + ""; 
                console.log("Remainder in inventory: ", quantity); 
                // console.log("Update query:\n " +  query); 

                connection.query(query, function (err, response) {
                    if (err) {
                        throw err;
                    }
                    // console.log(response);
                });

                // THIS PRESENTS THE PREVIOUS STOCK INFORMATION, NOT AFTER DATABASE HAS BEEN UPDATED. 
                // NEED TO FIX
                // console.log("Stock update after database update: " , response[0].stock_quantity); 



            } else {
                console.log("An error has occured.")
            }
            connection.end();
        });


    });
}

function updateInventory(){

   var query = "UPDATE products SET stock_quantity= " + quantity + " WHERE item_id= " + response[0].item_id + ""; 

    connection.query(query, function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
    });

}