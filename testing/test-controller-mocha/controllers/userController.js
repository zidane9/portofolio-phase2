'use strict'

const password = require('password-hash');
let User = require('../models/user');

let getAll = function (req, res, next) {
  // console.log("tes");
  User.find(function (err, users){
    if(err){
      res.json({error: err});
    } else {
      res.json(users);
    }
  })
};
let createOne = function (req, res, next) {
  if(!req.body.password) res.send({errors: {
                                password: 'value is undefined'
                              }});
  // Creating hash
  let hashPassword = password.generate(req.body.password);
  User.create({
    name: req.body.name,
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role
  }, function (error, user){
    if(error) res.send(error);
    else res.send(user);
  })
};

let update = function (req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
  if (err) res.send(err);
  else if(!user) res.send({errors: 'User not found'})
  else {
    if(req.body.password){
      // Creating hash
      let hashPassword = password.generate(req.body.password);
      user.password = hashPassword;
    }

    if(req.body.name) user.name = req.body.name;
    if(req.body.email) user.email = req.body.email;
    if(req.body.phone) user.phone = req.body.phone;
    if(req.body.role) user.role = req.body.role;
    user.save(function (err, updatedUser) {
      if (err) res.send(err);
      else res.send(updatedUser);
    });
  }
  });
};

let deleteOne = function (req, res, next) {
  User.findOne({username: req.params.username}).remove(function(err, respond){
    if(err) res.send(err);
    else res.send(respond);
  })
};

module.exports = {
  getAll,
  // getOne,
  createOne,
  update,
  deleteOne
}
