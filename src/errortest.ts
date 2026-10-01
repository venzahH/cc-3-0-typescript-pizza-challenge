/*
File: index.ts
Author: Venzah
Date: July 7, 2025
Summary: This is the file for testing errors. It is highly recommended you test this file in IntelliJ as it is able
to ignore compilation errors and will instead provide the error statements written for these cases.
 */

import {Pizza, PizzaSize, Topping} from './pizza';
import {PizzaBuilder} from "./pizzabuilder";
import {PizzaStore} from "./pizzastore";
import {Order} from "./order";

// Available toppings
const toppings: Topping[] = [
    { name: "Pepperoni", price: 1.50 },
    { name: "Mushrooms", price: 1.00 },
    { name: "Extra Cheese", price: 1.25 },
    { name: "Sausage", price: 1.75 }
];

// Core Feature 1 Testing
console.log("\nCore feature 1: Enhanced Pizza Management\n")
const task1Pizza = new Pizza(PizzaSize.SMALL);
task1Pizza.addTopping(toppings[0]); // Pepperoni
task1Pizza.addTopping(toppings[2]); // Extra Cheese
task1Pizza.addTopping(toppings[1]); // Mushrooms

function printToppings(toppingList: Topping[]): void{
    for(let i = 0; i < toppingList.length; i++){
        console.log(toppingList[i].name);
    }
}
console.log("getToppings test 1 result:");
printToppings(task1Pizza.getToppings()); // Should return Pepperoni, Extra Cheese, Mushrooms

console.log("\nremoveTopping test 1 result: " + task1Pizza.removeTopping("Sausage")); // Should return false
console.log("\ngetToppings test 2 result:");
printToppings(task1Pizza.getToppings()); // Should return Pepperoni, Extra Cheese, Mushrooms

console.log("\nremoveTopping test 2 result: " + task1Pizza.removeTopping("Mushrooms")); // Should return true since
console.log("\ngetToppings test 3 result:");
printToppings(task1Pizza.getToppings()); // Should return Pepperoni, Extra Cheese

console.log("\nDuplicate toppings test result:");
task1Pizza.addTopping(toppings[0]) // Should not add Pepperoni to the list because it's already a topping
console.log("\ngetToppings test 4 result:");
printToppings(task1Pizza.getToppings()); // Should return Pepperoni, Extra Cheese

console.log("\nPizza price: " + task1Pizza.getPrice()); // Test getPrice functionality. Should return 11.74
console.log("\nPizza description: " + task1Pizza.getDescription()); // Test getDescription functionality

// Core Feature 1 Error Testing
console.log("\nCore Feature 1 Error Testing");
task1Pizza.setSize("XLARGE"); // Should print an invalid size error
task1Pizza.addTopping({name: "Peppers"}); // Should print an invalid topping error
task1Pizza.addTopping({price: 1.50}); // Should print an invalid topping error
task1Pizza.addTopping({name: 1.50, price: 0.90}); // Should print an invalid type error
console.log(task1Pizza.removeTopping(12)); // Should print invalid type error and false
const task1PizzaSizeError = new Pizza("XLARGE"); // Should print invalid size error
task1Pizza.setSize(); // Should print invalid size error
task1Pizza.addTopping(); // Should print no topping error


// Core Feature 3 Testing
console.log("\nCore Feature 3: Builder Pattern\n");
const task3PizzaBuilder = new PizzaBuilder().setSize(PizzaSize.LARGE).addTopping(toppings[0]).build() // Large pizza with pepperoni
console.log("Pizza description: " + task3PizzaBuilder.getDescription()) // Should return large pizza with Pepperoni
console.log("Pizza price: " + task3PizzaBuilder.getPrice()) // Should print 18.49

task3PizzaBuilder.addTopping(toppings[3]);
console.log("\nPizza description: " + task3PizzaBuilder.getDescription()) // Should return large pizza with Pepperoni, Sausage
console.log("Pizza price: " + task3PizzaBuilder.getPrice()) // Should print 20.24

task3PizzaBuilder.setSize(PizzaSize.SMALL);
console.log("\nPizza description: " + task3PizzaBuilder.getDescription()) // Should return small pizza with Pepperoni, Sausage
console.log("Pizza price: " + task3PizzaBuilder.getPrice()) // Should print 12.24

// Core Feature 3 Error Testing
console.log("\nCore Feature 3 Error Testing");
task3PizzaBuilder.setSize(12); // Should return invalid type error
task3PizzaBuilder.setSize(); // Should return invalid type error
task3PizzaBuilder.addTopping({name: 12, price: "2"}); // Should return invalid type error
task3PizzaBuilder.addTopping({name: "Peppers"}); // Should return invalid topping error
task3PizzaBuilder.addTopping({price: 2.00}); // Should return invalid topping error
task3PizzaBuilder.addTopping(); // Should return invalid topping error


// Bonus Challenge 5: Inventory System
console.log("\nBonus Challenge 5: Inventory System\n");
const store1 = new PizzaStore();
store1.addNewTopping(toppings[0], 500);
store1.addNewTopping(toppings[1], 200);
store1.addNewTopping(toppings[2], 750);
store1.addNewTopping(toppings[3], 1);

const toppingList = store1.getToppingList();
function getStoreToppings(): void{
    for(let i = 0; i < toppingList.length; i++){
        console.log(toppingList[i].name + " | " + toppingList[i].price + " | " + toppingList[i].quantity);
    }
}
getStoreToppings();

store1.replenishTopping("Pepperoni", 100);

console.log();
getStoreToppings(); // Pepperoni should be increased to 600

// Bonus Challenege 5 Error Testing
console.log("\nBonus Challenge 5 Error Testing");
store1.addNewTopping(); // Should print missing topping or quantity error
store1.addNewTopping({}, ); // Should print missing topping or quantity error
store1.addNewTopping({name: "Peppers"}, 100); // Should print invalid topping error
store1.addNewTopping({price: 100}, 100); // Should print invalid topping error
store1.addNewTopping({name: "Peppers" , price: 100}, 0); // Should print invalid quantity error
store1.addNewTopping({name: "Peppers" , price: 100}, -20); // Should print invalid quantity error
store1.addNewTopping(); // Should print missing topping or quantity error
store1.addNewTopping(toppings[0], 10); // Should print duplicate topping error
store1.replenishTopping("Pepperoni", 0); // Invalid quantity error
store1.replenishTopping("Pepperoni", -10);// Invalid quantity error
store1.replenishTopping(); // No topping or quantity error
store1.replenishTopping("Pineapple", 60); // Topping does not exist error
store1.replenishTopping(100); // No topping or quantity error
store1.addOrder();


// Core Feature 2 Testing
console.log("\nCore Feature 2: Order Discounts\n");
const order1 = new Order("John Doe", store1);
order1.addPizza(task1Pizza);
console.log(order1.getOrderSummary()); //Should print a small pizza with Pepperoni, extra cheese worth 11.74
getStoreToppings(); // Should show that pepperoni has 599 and extra cheese has 749
order1.addPizza(task1Pizza);
order1.addPizza(task1Pizza);
console.log(order1.getOrderSummary()); // Should print 3 small pizza with Pepperoni, extra cheese worth 31.70 (Discount should be applied)

// Core Feature 2 Error Testing
console.log("\nCore Feature 2 Error Testing");
order1.addPizza(); // Non-pizza error
order1.addPizza(12); // Non-pizza error
order1.addPizza(task3PizzaBuilder); // Should successfully add pepperoni and sausage pizza
order1.addPizza(task3PizzaBuilder); // Should error because store is out of sausage
store1.replenishTopping("Sausage", 10);
order1.addPizza(task3PizzaBuilder); // Should successfully add pizza this time since sausage has been restocked

//GetOrder
store1.addOrder(order1);
const orders = store1.getOrders();
for(let i = 0; i < orders.length; i++){
    console.log(orders[i].getOrderSummary());
}


// Testing area: Please feel free to add your own tests here