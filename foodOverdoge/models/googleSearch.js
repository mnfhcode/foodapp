var config = require('../config/config.js');
var GooglePlaces = require('googleplaces');
var geocoder = require('geocoder');

var google = GooglePlaces(config.googleKey, 'json');

//Eample Call
/*
search({location:'San Francisco, CA', type:'Food', radius:16000, keyword:'tacos'}, fucntion(results){
	//do something with results
	console.log(results);
});
*/
function search(params, cb){
	geocoder.geocode(params.location, function(err, res){
		if (err){
			console.log(err);
		}
		else{
			var lat = res.results[0].geometry.location.lat;
			var lng = res.results[0].geometry.location.lng;
			params.location = lat + ',' + lng;
			google.placeSearch(params, function(err, data){
				if (err){
					console.log(err);
				}
				else{
					cb(data);
				}
			});
		}
	});
}

function getPhotoUrl(photoReference, cb){
	var url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoReference + "&key=" + config.googleKey;
	cb(url);
}

exports.search = search;