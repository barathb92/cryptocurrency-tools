'use strict';

//SET EMAIL CONFIGURATION AT CONFIG.JSON

var ALERT_VALUE = 5.35;

var fs = require('fs');
var request = require('request');
var nodemailer = require('nodemailer');
var config = require('./config.json');
var moment = require('moment')();
var message;
var emailSent = false;

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.smtpConfig);

// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.error(error);
   } else {
        console.info('Server is ready to take our messages');
   }
});

function sendMail (toAddress, subject, message, html) {
    let mailOptions = {
        from: config.mailFrom,
        to: toAddress,
        subject: subject,
        text: message,
        html: html
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent');
    });

}

request.get('https://min-api.cryptocompare.com/data/price?fsym=ANS&tsyms=USD', function (error, response, body) {
	if (error) {
		console.log('error:', error);
	}
	console.log("Current value of ANS/NEO at "+ moment.format('YYYY-MM-DD HH:mm:ss Z') +" is : " + JSON.parse(body).USD + "$" );
	message = "Current value of ANS/NEO at "+ moment.format('YYYY-MM-DD HH:mm:ss Z') +" is : " + JSON.parse(body).USD + "$";
	
	if(JSON.parse(body).USD < ALERT_VALUE && !emailSent) {
		sendMail(config.toAddress, "Price Drop Alert for ANS", message, "");
		emailSent = true;
	}
});

