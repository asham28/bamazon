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

    supervisorQuery();

});

// =========================================
// FUNCTION AFTER CONNECTING TO MYSQL
// =========================================


// MANAGER VIEW OPTIONS
function supervisorQuery() {

    inquirer.prompt([{
        type: "list",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
        ],
        name: "supervisorOptions"

    }]).then(function (answer) {

        var choice = answer.supervisorOptions;

        switch (choice) {
            case 'View Product Sales by Department':
                viewDepartmentSales()
                break;

            case 'Create New Department':
                createDepartment()
                break;

            default : 
            console.log("There's been an error."); 

        };
    });
}

// VIEW PRODUCTS SALES BY DEPARTMENT FUNCTION
function viewDepartmentSales() {

    var query = "SELECT department_id, department_name, over_head_costs, product_sales, total_profit FROM departments";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(consoleTable.getTable(response));
        connection.end();
    })
};