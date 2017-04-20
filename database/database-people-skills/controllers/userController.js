'use strict'

const mongoose = require('mongoose');
let User = require('../models/user');

let usersSeeder = require('../seeders/users.json');

let seedingUsers = function(req, res) {
  let list = [];
  for(let i=0;i<usersSeeder.length;i++){
    let tmp = {
      name: usersSeeder[i].name,
      skillList: []
    }
    for(let j=0;j<usersSeeder[i].skillList.length;j++){
      tmp.skillList.push({
        grade: usersSeeder[i].skillList[j].grade,
        skill: mongoose.Types.ObjectId(usersSeeder[i].skillList[j].skill)
      })
    }
    list.push(tmp);
  }
  User.collection.insert(list, function(err,results) {
    if(err) {
      res.send(err);
    } else {
      res.send(results)
    }
  })
}

let getAll = function (req, res, next) {
  User.find()
    .populate('skillList')
    .exec(function (err, users){
    if(err){
      res.json({error: err});
    } else {
      res.json(users);
    }
  })
};

let getOne = function(req,res,next){
  User.findOne({_id: req.params.id})
    .populate('skillList')
    .exec(function (err, users){
      if(error) res.send(error);
      else res.send(users);
  })
};

let createOne = function (req, res, next) {
  User.create({
    name : req.body.name,
    skillList : req.body.skillList,
  }, function (error, user){
    if(error) res.send(error);
    else res.send(user);
  })
};

let update = function (req, res, next) {
  let temp = {
    name : req.body.name,
    skillList : req.body.skillList,
  }
  User.update({ _id: req.params.id }, { $set: temp}, function(err, response){
    if(err) res.send(err);
    res.send(response);
  });
};

let deleteOne = function (req, res, next) {
  User.findOne({_id: req.params.id}).remove(function(err, response){
    if(err) res.send(err);
    res.send(response);
  });
};

module.exports = {
  seedingUsers,
  getAll,
  getOne,
  createOne,
  update,
  deleteOne
}
