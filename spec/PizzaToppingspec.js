
/**
 * PizzaToppingsAnalyzer
 * @fileoverview PizzaToppingsAnalyzer
 * testing of the most common pizza toppings
 * 
 * @providesModule PizzaToppingspec
 * @author tamarigil@gmail.com (Gil Tamari)
 */
/*
running: 

$ jasmine-node spec/

.....

Finished in 0.007 seconds
5 tests, 1 assertion, 0 failures, 0 skipped


downloading / loading: http://files.olo.com/pizzas.json
downloading / loading: http://files.olo.com/pizzas.json
downloading / loading: http://files.olo.com/pizzas.json
downloading / loading: http://files.olo.com/pizzas.json
downloading / loading: http://files.olo.com/pizzas.json
[ { topping: 'pepperoni', orederedNo: 6335, rank: 1 },
  { topping: 'four cheese', orederedNo: 1611, rank: 2 },
  { topping: 'mozzarella cheese', orederedNo: 1461, rank: 3 },
  { topping: 'bacon', orederedNo: 1447, rank: 4 },
  { topping: 'beef', orederedNo: 1140, rank: 5 },
  { topping: 'sausage', orederedNo: 831, rank: 6 },
  { topping: 'mushrooms', orederedNo: 733, rank: 7 },
  { topping: 'italian sausage', orederedNo: 672, rank: 8 },
  { topping: 'black olives', orederedNo: 456, rank: 9 },
  { topping: 'chicken', orederedNo: 401, rank: 10 },
  { topping: 'pineapple', orederedNo: 360, rank: 11 },
  { topping: 'ham', orederedNo: 341, rank: 12 },
  { topping: 'jalapenos', orederedNo: 258, rank: 13 },
  { topping: 'green peppers', orederedNo: 206, rank: 14 },
  { topping: 'canadian bacon', orederedNo: 174, rank: 15 },
  { topping: 'diced white onions', orederedNo: 168, rank: 16 },
  { topping: 'cheddar cheese', orederedNo: 154, rank: 17 },
  { topping: 'diced tomatoes', orederedNo: 128, rank: 18 },
  { topping: 'alredo sauce', orederedNo: 127, rank: 19 },
  { topping: 'onions', orederedNo: 121, rank: 20 } ]
*/

var PizzaToppingsAnalyzer = require('../PizzaToppingsAnalyzer/PizzaToppingsAnalyzer.js'),
	pizzaAnalyzer 		  = new PizzaToppingsAnalyzer('http://files.olo.com/pizzas.json'),
	top20,
	top10,
	top5;

top20 = [ { topping: 'pepperoni', orederedNo: 6335, rank: 1 },
  { topping: 'four cheese', orederedNo: 1611, rank: 2 },
  { topping: 'mozzarella cheese', orederedNo: 1461, rank: 3 },
  { topping: 'bacon', orederedNo: 1447, rank: 4 },
  { topping: 'beef', orederedNo: 1140, rank: 5 },
  { topping: 'sausage', orederedNo: 831, rank: 6 },
  { topping: 'mushrooms', orederedNo: 733, rank: 7 },
  { topping: 'italian sausage', orederedNo: 672, rank: 8 },
  { topping: 'black olives', orederedNo: 456, rank: 9 },
  { topping: 'chicken', orederedNo: 401, rank: 10 },
  { topping: 'pineapple', orederedNo: 360, rank: 11 },
  { topping: 'ham', orederedNo: 341, rank: 12 },
  { topping: 'jalapenos', orederedNo: 258, rank: 13 },
  { topping: 'green peppers', orederedNo: 206, rank: 14 },
  { topping: 'canadian bacon', orederedNo: 174, rank: 15 },
  { topping: 'diced white onions', orederedNo: 168, rank: 16 },
  { topping: 'cheddar cheese', orederedNo: 154, rank: 17 },
  { topping: 'diced tomatoes', orederedNo: 128, rank: 18 },
  { topping: 'alredo sauce', orederedNo: 127, rank: 19 },
  { topping: 'onions', orederedNo: 121, rank: 20 } ];
  

top10 = top20.splice(0,10);
top5  = top10.slice(0,5);


describe('checking for empty url',function(){
	pizzaAnalyzer2 		  = new PizzaToppingsAnalyzer('');
	
	it('shoud use the defult url which is http://files.olo.com/pizzas.json', function() {
	  pizzaAnalyzer2.init(function(topToppings){
	  	var topToppings = pizzaAnalyzer2.getTopToppings(20);
	    expect(topToppings).toEqual(topToppings);
	    asyncSpecDone();
	  });
	});
});

describe('checking for valid behavior - initialization and top 20 results',function(){

	pizzaAnalyzer.init(function(topToppings){console.log(pizzaAnalyzer.getTopToppings(20))});

	it('it should respond with the list of 20 top toppings orderd: pepperoni,four cheese,mozzarella cheese,bacon,beef,... ', function() {
	   pizzaAnalyzer.init(function(topToppings){
	  	var topToppings = pizzaAnalyzer.getTopToppings(20);
	    expect(topToppings).toEqual(top20);
	    asyncSpecDone();
	  });
	});
});

describe('checking for "different" / "invalid" unexpected behavior ',function(){
	pizzaAnalyzer.init(function(topToppings){console.log(pizzaAnalyzer.getTopToppings(20))});

	it('it should respond with the following list of 10 top toppings orderd: pepperoni,four cheese,mozzarella cheese,bacon,... ', function() {
		pizzaAnalyzer.init(function(topToppings){
			var topToppings = pizzaAnalyzer.getTopToppings(10);
			expect(topToppings).toEqual(top10);
			asyncSpecDone();
		});
	});

	it('it should respond with the following list of 5 top toppings orderd: pepperoni,four cheese,mozzarella cheese,bacon ', function() {
	  	pizzaAnalyzer.init(function(topToppings){
			var topToppings = a.getTopToppings(5);
			expect(topToppings).toEqual(top5);
			asyncSpecDone();
		});
	});

	it('it should respond with an empty list of top toppings', function() {
	  	var topToppings = pizzaAnalyzer.getTopToppings(0);
	    expect(topToppings).toEqual([]);
	    asyncSpecDone();
	});

});


