'use strict';


var fs = require('fs');
var app = require('../../app.js');
var request = require('request');
var moment = require('moment')();

module.exports = {
	checkCryptoPrice: checkCryptoPrice
};

function checkCryptoPrice(req, res){
	return new Promise(function(resolve, reject){
		var cName = req.swagger.params.CurrencyInfo.value.CurrencyName.toUpperCase();
		var valueType = req.swagger.params.CurrencyInfo.value.ValueType.toUpperCase();
		
		request.get('https://min-api.cryptocompare.com/data/price?fsym='+cName+'&tsyms='+valueType, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var msg = "Current value of " + cName + " at "+ moment.format('YYYY-MM-DD HH:mm:ss Z') +" is : " + JSON.parse(body)[valueType] + valueType;
				resolve(msg);
				res.send(msg);
			} else {
				reject(error);
				res.send(err);
			}
			
	
		});

	});
}

