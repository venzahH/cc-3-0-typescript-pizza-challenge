/*
File: pizza.ts
Author: Venzah Hamilton
Date: July 7, 2025
Summary: File containing the Order class.
 */

import { Pizza } from './pizza';
import {PizzaStore, Stock} from "./pizzastore";


export class Order {
  private pizzas: Pizza[] = []; // List of pizzas that makes up the order
  private customerName: string; // Name of the customer ordering
  private store: PizzaStore; // Pizza store variable included for bonus challenge 5 to work

  constructor(customerName: string, store: PizzaStore) {
    this.customerName = customerName;
    this.store = store;
  }

  /*
  Function: addPizza
  Argument: pizza - a Pizza object containing the size of the pizza and the toppings
  Return: void
  Summary: This function adds a pizza only if all the toppings exist in the store and those toppings are stocked
  (ie. topping quantity is greater than 0). Otherwise, the pizza is not added.
   */
  addPizza(pizza: Pizza): void {
    if(pizza instanceof Pizza){ //Validates that pizza being added is a Pizza type object
      const pizzaToppings = pizza.getToppings();
      const storeToppings = this.store.getToppingList();

      let storedToppings: Stock[] = [];
      for(let i = 0; i < pizzaToppings.length; i++){ // Loops through the pizza's toppings to check that all toppings exist in that store and the toppings are stocked
        for(let j = 0; j < storeToppings.length; j++){
          if(pizzaToppings[i].name === storeToppings[j].name && storeToppings[j].quantity <= 0){ // If topping exists but store is out of stock, the pizza is not added to the order
            console.error("This store is currently out of " + pizzaToppings[i].name);
            return;
          }
          else if(pizzaToppings[i].name === storeToppings[j].name && storeToppings[j].quantity > 0){ // Stores Stock objects in a list
            storedToppings.push(storeToppings[j]);
          }
        }
      }

      for(let i = 0; i < storedToppings.length; i++){ // Iterates through the Stock object list and reduces the quantity of each topping
        storedToppings[i].quantity--;
      }
      console.log(pizza.getDescription() + " has been added to your order.")
      this.pizzas.push(pizza);
    }
    else{ // User is informed if arugment passed is not a pizza object and does not try to create the order
      console.error("Pizza being added is not a pizza.")
    }
  }

  /*
  Function: getTotalPrice
  Argument: none
  Return: number - The total price of all the pizzas in the order
  Summary: This function will check if the order is applicable for a discount (the order must be greater than 25 dollars).
  If eligible, 10% is taken from the total. If not eligible, it returns the total as is.
   */
  getTotalPrice(): number {
    if(this.getSubtotal() > 25){ // Applies 10% off total order if total cost is greater than $25
      return (this.getSubtotal() - this.getDiscount());
    }
    return this.getSubtotal();  // No discount is applied if less than $25 and just returns original amount
  }

  /*
  Function: getOrderSummary
  Argument: none
  Return: string - Description of the order
  Summary: This function return a description of the order including the customer's name, the descriptions of each
  pizza in the order, and the total price of the order.
   */
  getOrderSummary(): string {
    const pizzaDescriptions = this.pizzas.map(pizza => `- ${pizza.getDescription()}: $${pizza.getPrice().toFixed(2)}`);
    return `Order for ${this.customerName}:\n${pizzaDescriptions.join('\n')}\nTotal: $${this.getTotalPrice().toFixed(2)}\nYou saved: $${this.getDiscount().toFixed(2)}`;
  }

  /*
  Function: getSubtotal
  Argument: none
  Return: number - The true total price of the order (no discounts applied)
  Summary - This sums up all the prices of all the pizzas in the order and returns the sum
   */
  private getSubtotal() : number{
    return this.pizzas.reduce((sum, pizza) => sum + pizza.getPrice(), 0);
  }

  /*
  Function: getDiscount
  Argument: none
  Return: Number - The price reduced by 10%
  Summary: This function will take the subtotal (true price) of the order and reduce it by 10% and returns the new price
   */
  private getDiscount(): number{
    if(this.getSubtotal() > 25){ // Calculates discount if subtotal is greater than $25
      return this.getSubtotal() * 0.1;
    }
    else{ // Returns a discount of $0.00 if subtotal is less than $25
      return 0.00;
    }
  }
}
