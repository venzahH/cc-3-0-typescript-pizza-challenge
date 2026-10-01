[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ZoGrVW1g)
# CC3.0-TypeScript Pizza Challenge
This is an indvidual code challenge for TypeScript Week

## Overview
Build a pizza ordering system using TypeScript with object-oriented programming concepts. Core functionality (all 4 assignment tasks are completed) with an additional of bonus challenge 5

## Current Features
- Create pizzas with different sizes (Small: $8.99, Medium: $12.99, Large: $16.99)
- Add toppings with individual pricing
- Change the pizza sizes
- Generate price, description, and list of toppings of individual pizzas
- Remove toppings from pizzas
- Calculate total price including base price and toppings
- Create orders with multiple pizzas
- Calculate total price of order
- Generate order summaries
- Apply a 10% discount to orders over $25
- Create pizzas using a pizza builder allowing you to set the pizza size and toppings all at once
- Order from pizza stores that track the toppings that they have and the amount of each topping

## Setup & Run (terminal)
1. Ensure that you have Node.js and/or npm installed. For installation guide, please see: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Download this git as a ZIP file
3. Unzip ZIP file
4. Navigate to the file in terminal
5. Run the following to download dependencies and run the index.ts file: 
```bash
npm install
npm run dev
```
### Note: As mentioned, this will run the index.ts file. To run the errortest.ts file which contains compilation error tests, it's highly recommended you run that file in IntelliJ using the steps below.

## Setup & Run (IntelliJ)
1. Open IntelliJ
2. Ensure you have Node.js installed and that Node.js is an installed plugin for your IntelliJ (for more information, please see: https://www.jetbrains.com/help/idea/developing-node-js-applications.html#ws_node_before_you_start)
3. Navigate to File | Open... | the unzipped file
5. In the lefthand navigation panel, expand the src folder
6. Select index.ts or errortest.ts
7. Navigate to Run | Run... | select the file name that you are currently on

### Note: It's highly recommended you use this method to run errortest.ts to view error handling on compilation errors that would be flagged in the terminal but would run in IntelliJ

