'use strict';

//SET EMAIL CONFIGURATION AT CONFIG.JSON

var ALERT_VALUE = 4;

var request = require('request');
var nodemailer = require('nodemailer');
var smtpconfig = require('./config/smtp-config.json');
var moment = require('moment')();
var message;
var emailSent = false;

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var path = require('path');
var fs = require('fs');
var app = require('express')();

/*
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpconfig.smtpConfig);

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
        from: smtpconfig.mailFrom,
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
		sendMail(smtpconfig.toAddress, "Price Drop Alert for ANS", message, "");
		emailSent = true;
	}
});
*/

var swaggerConfig = {
    appRoot: __dirname
};

SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
    if (err) { throw err; }

    // add swagger-ui
    app.use(SwaggerUi(swaggerExpress.runner.swagger));

    // install middleware
    swaggerExpress.register(app);

    //start Express
    var port = process.env.PORT || 5000;
    app.listen(port);

});

module.exports = {
    app: app
};

