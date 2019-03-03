# Bamazon Store

![Customer Example](/BamazonCustomerScreenshot.png)

## Customer App

This command line application written with Node.js prompts customers to make a purchase from a fictional online store. When started, the available items for purchase are displayed in the command line, followed by a prompt to "Make a Purchase" or "Exit Bamazon shop".

If exit is selected, the Node program and database connection will end. If "Make a Purchase" is chosen, the user is prompted to enter the item of the product they'd like to purchase, then the quantity.

If there is not enough inventory in stock to fullfill the customer's request, the application will let them know there was insufficent quantity and the number available in stock to make another purchase request.

If the item and quantity requested by the customer is available, the command line will display the total cost of the customer's order. All purchases made by customers are updated in a mySQL database called "bamazon", where available products are tracked.

When the request is complete, the customer can choose to make another purchase or exit the Bamazon store.

### User Story
As a Bamazon customer, I want to see available product information so that I can make a choice about which item to purchase and see the total cost of my order.

![Manager Example](/BamazonManagerScreenshot.png)

## Manager App
This command line application lets managers at Bamazon view current inventory and add additional stock or products as they become available.

### Manager Options
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product
* Exit shop

### User Story
As a Bamazon manager, I want to see and update product information so that I can keep track of customer purchases and ensure there is enough inventory in stock to meet demand.

## Technologies Used
Below is picture showing the original values for the stock of the Bamazon store, which has since changed as customers have made purchases and managers have updated products.

![mySQL Table](/mySQLScreenshot.png)

### Node.js Packages Used
* inquirer
* mysql