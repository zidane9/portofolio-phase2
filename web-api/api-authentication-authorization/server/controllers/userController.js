'use strict'

const password = require('password-hash-and-salt');
let User = require('../models/user');

let getAll = function (req, res, next) {
  User.find(function (err, users){
    if(err){
      res.json({error: err});
    } else {
      res.json(users);
    }
  })
};

let createOne = function (req, res, next) {
  // Creating hash and salt
  password(req.body.password).hash(function(error, hash) {
      if(error)
          throw new Error('Something went wrong!');

      // Store hash (incl. algorithm, iterations, and salt)
        User.create({
          name : req.body.name,
          email : req.body.email,
          password : hash
        }, function (error, user){
          if(error) throw error;
          res.send(user);
        });
})
};

// let login = function(req,res,next){
//   User.findOne({email: req.body.username}, function (err, user) {
//   if (err) return handleError(err);
//
//   if(!user){
//     res.send("Username or password invalid!");
//   }
//   else {
//   // Verifying a hash
//     password(req.body.password).verifyAgainst(user.password, function(error, verified) {
//         if(error)
//             throw new Error('Something went wrong!');
//         if(!verified) {
//             res.send("Username or password invalid!");
//         } else {
//             res.send("Succeed");
//         }
//     });
//   }
//   })
// }

module.exports = {
  getAll,
  createOne
}
