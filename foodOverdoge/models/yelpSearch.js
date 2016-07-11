var config = require('../config/config.js');
var Yelp = require('yelp');
var yelp = new Yelp(config.yelpAPI);

function search(params, cb){
	yelp.search(params, function(err, res){
		if (err){
			console.log(err);
		}
		else{
			cb(res);
		}
	});
}

function randomPlace(params, cb){
	//Most basic params required here would be {terms:'food', location:'somePlace'}
	console.log(params);
	search(params, function(res){
		var place = res.businesses[randInt(0, res.businesses.length)];
		cb(place);				
	});
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

exports.search = search;
exports.randomPlace = randomPlace;