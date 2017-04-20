'use strict'

const jwt = require('jsonwebtoken');

let decodeToken = function(token){
  try {
    var decoded = jwt.verify(token, 'secret');
    return decoded;
  } catch(err) {
    return ({error: err});
  }
}
let authenticate = function (req, res, next) {
  jwt.verify(req.headers.token, "secret", function(err, decoded) {
    if(err) {
      res.send(err);
    }
    else {
      next();
    }
  });
}

module.exports = {
  decodeToken,
  authenticate
}
