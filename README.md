[![Build Status](https://travis-ci.org/xmen4u/pizza_toppings.svg)](https://travis-ci.org/xmen4u/pizza_toppings)


## Top Pizza Toppings
============================================

Requirement:

A pizza chain wants to know which topping combinations are most popular for Build Your Own pizzas. Given the sample of orders at http://files.olo.com/pizzas.json, write an application (in C#, F# or JS) to output the top 20 most frequently ordered pizza configurations, listing the toppings for each along with the number of times that pizza configuration has been ordered. 

You can see my coding style - Google style-guided, running grunt will: test my jshint my code

Use this with my permission only

## ToC
---------------------

1. [Main app](#main)


<a name="main">Main app</a>
---------------------


## Install
```
sudo git clone https://github.com/xmen4u/pizza_toppings.git && cd pizza_toppings && npm install  

```

## Initialization

You can change the "pizza toppings file" by changing the "url" in ```PizzaToppingsAnalyzer.js``` to other file

```
// fs       = require('fs'), // only if we need to perform locally
```
the commented url is for local file loading

and then comment the request line and uncomment the fs.create, from:

```
request({url: self.pizzaToppingsUrl})  // downloading the file
// fs.createReadStream(self.pizzaToppingsUrl) // only if we need to perform locally
```

top:

```
//request({url: self.pizzaToppingsUrl})  // downloading the file
fs.createReadStream(self.pizzaToppingsUrl) // only if we need to perform locally
```
don't forget to change the initialization in ```app.js``` 

```
pizzaAnalyzer       = new PizzaToppingsAnalyzer('http://files.olo.com/pizzas.json');
```


![](https://raw.githubusercontent.com/xmen4u/pizza_toppings/master/img1.png)


### Testing

For testing I've used node-jasmine, you can run the tests via 

```
$ jasmine-node spec/
```

Expected output is:
```
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
```


## License

BSD -  ask for my permission