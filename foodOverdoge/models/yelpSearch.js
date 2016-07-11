var config = require('../config/config.js');
var Yelp = require('yelp');
var yelp = new Yelp(config.yelpAPI);

function search(params, cb){
	yelp.search(params, function(err, res){
		if (err){
			console.log(err);
		}
		else{
			cb(res)
		}
	}
}