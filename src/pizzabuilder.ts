/*
File: pizza.ts
Author: Venzah Hamilton
Date: July 7, 2025
Summary: File containing the PizzaBuilder class.
 */

import {Pizza, PizzaSize, Topping} from './pizza';


interface Builder { // Specifies the functions needed for building a Pizza object
    setSize(size: PizzaSize) : this;
    addTopping(topping: Topping): this;
    build(): Pizza;
}

export class PizzaBuilder implements Builder{
    private pizza: Pizza; // Pizza object

    constructor() {
        this.pizza = new Pizza(); // When a new PizzaBuilder object is created, it creates a new pizza object
    }

    /*
    Function: setSize
    Argument: PizzaSize - PizzaSize enum (small, medium, or large)
    Return: this - the pizzabuilder object
    Summary: This function sets the size of its Pizza object and returns itself
     */
    setSize(size: PizzaSize): this{ // Size is validated in the Pizza class
        this.pizza.setSize(size);
        return this;
    }

    /*
    Function: addTopping
    Argument: Topping - Topping object containing a name and price
    Return: this - the pizzabuilder object
    Summary: This function adds the specified topping to its Pizza object and returns itself
     */
    addTopping(topping: Topping): this{ // Topping is validated in the Pizza class
        this.pizza.addTopping(topping);
        return this;
    }

    /*
    Function: build
    Argument: None
    Return: Pizza - Pizza object
    Summary: This function returns the pizza stored in the pizza builder
     */
    build(): Pizza{
        return this.pizza;
    }
}
