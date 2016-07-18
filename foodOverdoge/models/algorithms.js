var geo = require('geocoder');

function comparePlace(name1, phone1, address1, name2, phone2, address2, cb){
	var matchName = false;
	var matchPhone = false;
	var matchAddress = false;
	if (name1 === name2){
		matchName = true;
	}
	if (phone1 === phone2){
		matchPhone = true
	}
	geo.geocode(address1, function(err, r){
		geo.geocode(address2, function(err, rr){
			console.log('r:' + r);
			console.log('rr:' + rr);
			add1 = r.results[0].formatted_address;
			add2 = rr.results[0].formatted_address;
			if (add1 === add2){
				matchAddress = true;
			}
			cb({matchName:matchName, matchPhone:matchPhone, matchAddress:matchAddress})
		});
	});
}

exports.comparePlace = comparePlace;