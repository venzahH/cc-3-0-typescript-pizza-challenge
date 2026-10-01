/*
File: pizza.ts
Author: Venzah Hamilton
Date: July 7, 2025
Summary: File containing the Pizza class.
 */


export enum PizzaSize { // Specifies named constants for pizza sizes
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

export interface Topping {
  name: string; // Name of the topping
  price: number; // Price of the topping
}

export class Pizza {
  private size: PizzaSize; // Size of the pizza
  private toppings: Topping[] = []; // The list of toppings the pizza contains
  private basePrices = { // Prices of a plain pizza (dependent on pizza size)
    [PizzaSize.SMALL]: 8.99,
    [PizzaSize.MEDIUM]: 12.99,
    [PizzaSize.LARGE]: 16.99
  };

  constructor(size: PizzaSize | void) { // Sets PizzaSize to a default value (PizzaSize.MEDIUM) for the PizzaBuilder class
    if(size === undefined){ // If no size is provided (ie. using the PizzaBuilder class), default size is used (MEDIUM)
      this.size = PizzaSize.MEDIUM;
    }
    else if(size === PizzaSize.SMALL || size === PizzaSize.MEDIUM || size === PizzaSize.LARGE) { // Validates pizza size is one of the three listed
      this.size = size;
    }
    else{ // If invalid size/type is provided, informs user and sets size to default (MEDIUM)
      console.error("Invalid size. Selecting default size (MEDIUM).");
      this.size = PizzaSize.MEDIUM;
    }
  }

  /*
  Function: setSize
  Argument: PizzaSize - PizzaSize enum (small, medium, or large)
  Return: void
  Summary: This function only changes the size of the Pizza object if the size specified is one of the three sizes
  specified in the PizzaSize enum.
   */
  setSize(size: PizzaSize): void{
    if(size === PizzaSize.SMALL || size === PizzaSize.MEDIUM || size === PizzaSize.LARGE) { // Validates pizza size is one of the three listed
      this.size = size;
    }
    else{
      console.error("Invalid size") // If pizza size is invalid, the program will not update the size
    }
  }

  /*
  Function: addTopping
  Argument: Topping - Topping object containing the name and price
  Return: void
  Summary: This function adds the topping to the Pizza object's list as long as the pizza doesn't have the topping and
  the topping is formatted correctly (has name and price)
   */
  addTopping(topping: Topping): void {
    if(topping === undefined){
      console.error("No topping provided.")
      return;
    }
    else if(topping.name == undefined || topping.price == undefined){ // Topping is not added if it is missing a name, price, or both
      console.error("Invalid topping. Ensure the topping has a name and price.")
      return;
    }
    else if(typeof topping.name !== "string" || typeof topping.price !== "number"){
      console.error("Invalid type. Ensure topping name is a string and topping price is a number.");
      return;
    }
    for (var i = 0; i < this.toppings.length; i++) { // Loops through the topping list to check if the topping being added already exists in the topping list
      if (this.toppings[i].name === topping.name) { // If the program finds the existence of a topping in the topping list, it notifies the user and skips adding the topping
        console.log(topping.name + " is already on this pizza.")
        return;
      }
    }
    this.toppings.push(topping);
  }

  /*
  Function: getPrice
  Argument: None
  Return: number - total price of the pizza
  Summary: This function sums up the prices of the topping on the pizza and the price of the pizza size and returns the total price
   */
  getPrice(): number {
    const basePrice = this.basePrices[this.size];
    const toppingsPrice = this.toppings.reduce((sum, topping) => sum + topping.price, 0);
    return basePrice + toppingsPrice;
  }

  /*
  Function: getDescription
  Argument: None
  Return: string - description of the pizza
  Summary: This function returns a string description of the pizza including its size and the toppings it has
   */
  getDescription(): string {
    const toppingNames = this.toppings.map(t => t.name).join(", ");
    return `${this.size} pizza${toppingNames ? ` with ${toppingNames}` : ""}`;
  }

  /*
  Function: removeTopping
  Argument: string - the name of the topping to be removed
  Return: boolean - indicates whether the topping was successfully removed or not
  Summary: This function removes the specified topping if it is in the pizza's topping list. If it is in the topping list,
  it removes the topping and returns true. If it is not in the topping list or the argument provided is not a string,
  it returns false.
   */
  removeTopping(toppingName: string): boolean {
    if(typeof toppingName !== "string"){ // Doesn't go through with trying to remove topping if argument is not a string
      console.error("Invalid type. Ensure topping name is a string.")
      return false;
    }

    for (var i = 0; i < this.toppings.length; i++) { // Loops through the topping list to check if the topping is in the list
      if (this.toppings[i].name === toppingName) {
        this.toppings.splice(i, 1); // Removes the topping from the topping list in so that the count is decreased as well (doesn't set it to undefined like delete does)
        return true;
      }
    }

    return false; // Returns false if the program is unable to find the specified topping in the topping list
  }

  /*
  Function: getToppings
  Argument: None
  Return: Topping[] - list of Toppings
  Summary: This function returns the list of Topping objects the pizza currently has
   */
  getToppings(): Topping[]{
    return this.toppings;
  }
}

