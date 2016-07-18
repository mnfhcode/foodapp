var google = require('./googleSearch');
var yelp = require('./yelpSearch');

function search(params, callback){
	var category = params.category || 'Restaurant';
	var location = params.location || 'San Francisco, CA';
	var distance = params.distance || 16094;//Ten miles
	var rating = params.rating || 3;//Default to 3 stars
	var terms = params.terms || null;
	var keyword = params.terms || null;
	yelp.search({category:category, location:location, distance:distance, rating:rating, term:terms}, function(yelpResults){
		google.search({location:location, radius:distance, rating:rating, type:'food', keyword:terms}, function(googleResults){
			var yelpResultList = [];
			var googleResultList = [];
			for (var i = 0; i < yelpResults.businesses.length; ++i){
				var curr = yelpResults.businesses[i];
				var currAddress = curr.location.display_address[0] + ', ' + curr.location.display_address[2];
				yelpResultList.push(new Result(curr.name, currAddress, curr.display_phone, curr.rating, curr.url, curr.image_url));
			}
			for (var i = 0; i < googleResults.results.length; ++i){
				var curr = googleResults.results[i];
				var currAddress = curr.vicinity;
				googleResultList.push(new Result(curr.name, currAddress, curr.display_phone, curr.rating, curr.url, curr.img_url));	
			}
			callback(yelpResultList, googleResultList);
		});
	});
}

function Result(name, address, phoneNumber, rating, url, img_url){
	this.name = name;
	this.address = address;
	this.phoneNumber = phoneNumber || null;
	this.rating = rating || null;
	this.url = url || null;
	this.img_url = img_url || null;
}

exports.search = search;