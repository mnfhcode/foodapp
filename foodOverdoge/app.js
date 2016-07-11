//Main entry point for the program
var express = require('express');//web framework
var exphbs = require('express-handlebars');//Template engine
var logger = require('morgan');//Logging info
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ejs = require('ejs');
var search = require('./models/yelpSearch.js');

//Create app object
var app = express();
//Create http server
var http = require('http').Server(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'ejs');
//Routing
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.post('/options', function(req, res){
	
});

app.post('/', function(req, res){
	search.randomPlace(postOptions(req), function(data){
		res.render('results', {
			title: 'Search Results',
			name: data.name,
			rating: data.rating,
			rating_img_url: data.rating_img_url,
			url: data.url,
			display_phone: data.display_phone,
			image_url: data.image_url,
			display_address: data.display_address
		});
	});
});

function postOptions(req){
	var search_terms = 'food';
	var search_category = req.body.category || 'Restaurant';
	var search_location = req.body.location || 'San Francisco';
	var search_distance = req.body.distance || 16094;//Ten miles
	var search_rating = req.body.rating || 3;//Default to 3 stars
	return {
		terms:search_terms,
		category:search_category,
		location:search_location,
		distance:search_distance,
		rating:search_rating
		};
}

//console.log(__dirname);
http.listen(3000, function(){
  console.log('listening on *:80');
});

