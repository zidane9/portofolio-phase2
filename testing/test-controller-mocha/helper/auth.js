'use strict'
require('dotenv').config();
var jwt = require('jsonwebtoken');

let authToken = function(req, res, next) {
	console.log(req.headers.token);
	jwt.verify(req.headers.token, process.env.SECRETKEYS, function(err, decoded) {
		// console.log(decoded)
		if(err) {
      res.send(err)
		} else {
			next();
		}
	})
}

module.exports = {
  authToken
}
