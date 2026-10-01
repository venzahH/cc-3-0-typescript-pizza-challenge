/*
File: pizza.ts
Author: Venzah Hamilton
Date: July 7, 2025
Summary: File containing the PizzaStore class for bonus challenge 5.
 */

import {Topping} from "./pizza";
import {Order} from "./order";


export interface Stock extends Topping{ // Takes properties of Topping including name and price
    quantity: number; // The number of toppings the store currently has
}


export class PizzaStore {
    private toppings: Stock[] = []; // List of toppings the store has stocked
    private orders: Order[] = []; // List of orders made to the store

    /*
    Function: addNewTopping
    Argument:
    topping - a Topping object containing the name and price
    quantity - initial number the store has stocked
    Return: void
    Summary: This function adds the topping to the list of Stock objects only if it has the required properties
    (name and price required) and the quantity is greater than 0
     */
    addNewTopping(topping: Topping, quantity: number): void{
        if(topping === undefined || quantity === undefined){
            console.error("Missing topping or quantity.")
        }
        else if(topping.name === undefined || topping.price === undefined){ // Validates topping argument. Checks that there is a name and price
            console.error("Invalid topping. Ensure the topping has a name and price.");
        }
        else if(typeof topping.name !== "string" || typeof topping.price !== "number"){
            console.error("Invalid type. Ensure topping name is a string and topping price is a number.");
        }
        else if(quantity <= 0){ // Checks to ensure topping has the necessary properties (name and price) and stock is greater than 0
            console.error("Invalid quantity. Ensure the quantity is greater than 0.");
        }
        else{
            for(let i = 0; i < this.toppings.length; i++){ // Checks to ensure no duplicates are added
                if(this.toppings[i].name === topping.name){
                    console.error("This topping already exists.");
                    return;
                }
            }
            this.toppings.push({quantity: quantity, ...topping});
        }
    }

    /*
    Function: addOrder
    Argument: order - an Order object containing the customer's name, the list of pizzas, and the store the order is for
    Return: void
    Summary: This function adds a customer's order to the store's list of orders
     */
    addOrder(order: Order): void{
        if(order instanceof Order){ // Validates that the argument passed is an Order object before adding it to the order list
            this.orders.push(order);
        }
        else{ // If any other type is passed, user is informed and the argument is not added to the list of order
            console.error("Order being added is not an order.")
        }
    }

    /*
    Function: replenishTopping
    Argument:
    toppingName - a string of the topping that is being restocked
    quantity - The number of toppings being added to the current stock
    Return: void
    Summary: This function will add the specified number to the topping stock only if the topping exists at that store
     */
    replenishTopping(toppingName: string, quantity: number): void{
        if(toppingName === undefined || quantity === undefined){
            console.error("No topping or quantity provided.");
            return;
        }
        else if(typeof toppingName !== "string" || typeof quantity !== "number"){
            console.error("invalid type. Please provide a name and number quantity.")
            return;
        }
        else if(quantity <= 0){
            console.error("Invalid quantity. Select a number greater than 0.")
            return;
        }
        else{
            let found: boolean = false;
            for(let i = 0; i < this.toppings.length; i++){ // Loops through list of all toppings at the store
                if(this.toppings[i].name === toppingName){ // Adds quantity amount of topping to the current stock if topping is found in the list
                    this.toppings[i].quantity = this.toppings[i].quantity + quantity;
                    found = true;
                }
            }
            if(!found){
                console.error("This topping does not exist.")
            }
        }
    }

    /*
    Function: getToppingList
    Argument: None
    Return: Stock[] - list of Stock objects
    Summary: This function returns the list of toppings the store has in stock
     */
    getToppingList(): Stock[]{
        return this.toppings;
    }

    /*
    Function: getOrders
    Argument: None
    Return: Order[] - list of Order objects
    Summary: This function returns the list of orders the store has
     */
    getOrders(): Order[]{
        return this.orders;
    }
}

