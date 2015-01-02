/**
 * PizzaToppingsAnalyzer
 * @fileoverview PizzaToppingsAnalyzer
 * analyzes the most common pizza toppings
 * 
 * @providesModule PizzaToppingsAnalyzer
 * @author tamarigil@gmail.com (Gil Tamari)
 */
'use strict';

var request  	= require('request'),
	JSONStream 	= require('JSONStream'),
	es 	        = require('event-stream'),
	 fs 			= require('fs'), // only if we need to perform locally
	async  	    = require('async');

/**
 * PizzaToppingsAnalyzer
 * @constructor
 * @param  {string} url to fetch the JSON object from
 * @param  {int} number of top toppings to return
 */
var PizzaToppingsAnalyzer = function(pizzaToppingsUrl, toppingsNo){
	this.pizzaToppingsUrl = pizzaToppingsUrl || 'http://files.olo.com/pizzas.json';
	this.hashMap          = {};
	this.readyToServe     = false;
	this.toppingsNo       = toppingsNo || 20;
}; // constructor

/**
* init
* loads the file from the path / downloads from the url
* builds the hashmap for post-processing
* @param {function} callback function
*/
PizzaToppingsAnalyzer.prototype.init = function(inCallback){

	var self = this;

	if (!this.pizzaToppingsUrl){
		return null;
	}// if

	self.readyToServe   = false;

	// we use an async for control flow mangement, use of 
	// "promise" framework wasn't needed due to lack of async events (also it has a memory / cpu footprint)
	async.waterfall([
		/**
		 * Downloading the file via the url
		 * process it via stream and parse only the needed parts
		 * building a hash-map based on topping name
		 * @param {function} callback for the next phase down the waterfall
		 */
	    function(callback){
	    	var Writable,
	    		wsFinalProcessStream;

	    	try {

	    		// creating a custom Writable stream for processing
	    		// the output stream , in our case we're mostly interested
	    		// in the final stage 
				Writable 			 = require('stream').Writable;
				wsFinalProcessStream = new Writable();

				// pipe event triggered
				wsFinalProcessStream.on('pipe', function(src) {
					
					src.on('end', function () {

						// we end the stream
						wsFinalProcessStream.write('');

						// next phase of the async, down the waterfall
						return callback(null, {success: 'success!'});
					});
				});
				
				/** error handling the stream */
				wsFinalProcessStream.on('error', function(err) {console.log('error!'); console.log(err); });

				/**
				 * write stream, overriding the write
				 * we don't pre-process or do any action
				 * while so, we just run over it 
				 * @param {object} buffer
				 * @param {string} encoding
				 * @param {function} callback
				 */
				wsFinalProcessStream._write = function (chunk, enc, next) {
				    next();
				};

				
				console.log('downloading / loading: ' + self.pizzaToppingsUrl);

				// Using .pipe() has other benefits too, like handling backpressure automatically
				// so that node won't buffer chunks into memory needlessly when the remote client is on a
				// really slow or high-latency connection.

				//request({url: self.pizzaToppingsUrl})  // downloading the file
				 fs.createReadStream(self.pizzaToppingsUrl) // only if we need to perform locally
				.pipe(JSONStream.parse([true,'toppings'])) // parsing it via properties we need
				.pipe(es.map(function (data,cb) {    // using event-stream we map the objects
					console.log(data);
					// creating a hash key based on topping 
					// most probably that we already have this topping, thus
					// the "if" order is taken into consideration
					data.forEach(function(topping){

						if (self.hashMap.hasOwnProperty(topping)){
							self.hashMap[topping] += 1;
						}
						else{
							self.hashMap[topping] = 1;
						}//if
						console.log(topping);
						console.log(self.hashMap[topping]);
					});// forEach
					

					cb(null,JSON.stringify(data));
				}))
				.pipe(wsFinalProcessStream,{end : false}); // done with the processing? move on
	    	}// try
	    	catch (err) {
			    return callback(new Error('error occured'),err);
			}// catch
	    },
	    /**
		 * Finished processing all the JSON properties, thus
		 * building the hashmap, now it's time to call the inputed callback
		 * @param {function} callback for the next phase down the waterfall
		 */
	    function(event, callback){
	    	// success, thus we're ready 
	    	// receive requests 
	    	if (event && 
	    		event.success){
		    	self.readyToServe   = true;

		    	// calling the inputed callback with the hashmap
	    		return inCallback(null,self.hashMap);
	    	}// if
	    }
	], 
	/**
	 * Error handling of the waterfall
	 * can be exposed / protected
	 * @param {object} error object
	 * @param {object} result object
	 */
	function (err, result) {
	   console.log('error ' + err.name + ' occured: ' + err.message);
	   console.log('result: ' + result);

	   return inCallback(err,result);
	   // of course on production we wont show the internal error
	});
	
}; // init

/**
* getTopToppings
* loads the file from the path / downloads from the url
* builds the hashmap and runs the analysis on it
* @param {function} callback function
*/
PizzaToppingsAnalyzer.prototype.getTopToppings = function(topToppings){
	var results = [],
		self 	= this;

	topToppings = topToppings || self.toppingsNo;


	// hashmap is ready
	if (self.readyToServe){

		// we run over the hashmap's keys, making it an array
		// sorting that array by the # of toppings in descending order
		// then we re-create that array to hold object with the topping name, # of topping, rank
		// finally we slice only the {topToppings} amount requested 
		results = Object.keys(self.hashMap)
						.sort(function(a, b) {return (self.hashMap[b] - self.hashMap[a]); })
	    				.map(function(topping, idx){return {topping: topping, orederedNo: self.hashMap[topping], rank: idx + 1}; })
	    				.slice(0, topToppings);
	}// if

	return results;
};// getTopToppings

module.exports = PizzaToppingsAnalyzer;
