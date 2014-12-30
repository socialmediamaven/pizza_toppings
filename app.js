/**
 * PizzaToppingsAnalyzer
 * @fileoverview PizzaToppingsAnalyzer
 * finding out which 20 most common pizza
 * toppings have been ordered
 * 
 * @providesModule app
 * @author tamarigil@gmail.com (Gil Tamari)
 */
'use strict';

var PizzaToppingsAnalyzer = require('./PizzaToppingsAnalyzer/PizzaToppingsAnalyzer.js'),
	pizzaAnalyzer 		  = new PizzaToppingsAnalyzer('http://files.olo.com/pizzas.json');



pizzaAnalyzer.init(function(topToppings){console.log(pizzaAnalyzer.getTopToppings(20)); });

