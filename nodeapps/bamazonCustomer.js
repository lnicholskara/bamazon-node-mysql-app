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
    
    db.query("SELECT item_id, product_name, consumer_price FROM products", function (err, res) {
        if (err) throw err;
        
        console.log("\n ID / Name / Price");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " / " + res[i].product_name + " / " + res[i].consumer_price);
    
        };

        console.log("\n");

        doesCustomerWanttoPurchase();

    });

});

function doesCustomerWanttoPurchase () {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Would you like to make a purchase or leave the shop?",
        choices: ["Make a purchase", "Exit Bamazon shop"]
    }).then(actionSelected)
};

function actionSelected(answer) {
    if (answer.choice === "Make a purchase"){
        makePurchase();
    }

    else {
        db.end();
    };
};

function makePurchase() {
    inquirer.prompt([
        {
        type: "input",
        name: "idRequested",
        message: "What is the ID of the product you want to purchase?"
        },
        {
        type: "input",
        name: "quantityRequested",
        message: "How much would you like to buy?"       
        }
    ]).then(function(answer){

        db.query("SELECT stock_quantity, consumer_price, item_id FROM products WHERE ?", {
            item_id: answer.idRequested
        }, function(err, res) {
            if (err) throw err;

            var quantity = res[0].stock_quantity;
            var id = res[0].item_id;
            var price = res[0].consumer_price;
        
            if (answer.quantityRequested <= quantity) {

                var remainingQuantity = quantity - answer.quantityRequested;

                db.query("UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: remainingQuantity
                    },
                    {
                    item_id: id
                    }
                ], function(err, res){
                    if(err) throw err;

                    var totalCost = answer.quantityRequested * price;

                    console.log("\nYour purchase cost $" + totalCost.toFixed(2) + ". Thank you!\n");

                    doesCustomerWanttoPurchase();

                });

            }

            else {
                console.log("\nInsufficent Quanity! " + quantity + " are in stock.\n");

                doesCustomerWanttoPurchase();

            };

        });

    });

};