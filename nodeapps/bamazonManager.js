var mysql = require("mysql");
var inquirer = require("inquirer");

var db = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "FightOn",
    database: "bamazon"
});

db.connect(function(err){
    if (err) throw err;

    managerOptions();

});

function managerOptions () {

    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "How would you like to proceed?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Exit shop"]
    }).then(actionSelected)

};

function actionSelected(answer) {
    if (answer.choice === "View Products for Sale"){
        viewProducts();
    }

    else if (answer.choice === "View Low Inventory") {
        viewLowInventory();
    }

    else if (answer.choice === "Add to Inventory") {
        addInventory();
    }


    else {
        db.end();
    };
};

function viewProducts () {

    db.query("SELECT item_id, product_name, consumer_price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;

        console.log("\n ID / Name / Price / Stock");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " / " + res[i].product_name + " / " + res[i].consumer_price + " / " + res[i].stock_quantity);
    
        };

        console.log("\n");

        managerOptions();

    });

};

function viewLowInventory () {

    db.query("SELECT item_id, product_name, consumer_price, stock_quantity FROM products WHERE stock_quantity <= 5", function (err, res) {
        if (err) throw err;

        console.log("\n ID / Name / Price / Stock");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " / " + res[i].product_name + " / " + res[i].consumer_price + " / " + res[i].stock_quantity);
    
        };

        console.log("\n");

        managerOptions();

    });

};

function addInventory () {

    inquirer.prompt([
        {
        type: "input",
        name: "idToUpdate",
        message: "What is the ID of the product you'd like to update?"
        },
        {
        type: "input",
        name: "quantityToUpdate",
        message: "How much would you like to add to the current quantity?"       
        }
    ]).then(function(answer){

        db.query("SELECT stock_quantity, item_id FROM products WHERE ?", {
            item_id: answer.idToUpdate
        }, function(err, res) {
            if (err) throw err;

            var quantity = res[0].stock_quantity;
            var id = res[0].item_id;

            var newQuantity = parseFloat(quantity) + parseFloat(answer.quantityToUpdate);

            db.query("UPDATE products SET ? WHERE ?",
            [
                {
                stock_quantity: newQuantity
                },
                {
                item_id: id
                }
            ], function(err, res){
                if(err) throw err;

                console.log("\nThere are now " + newQuantity + " items in stock for Product ID " + id + ".\n");

                managerOptions();

            });

        });
    
    });

};