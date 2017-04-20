'use strict'

let Todo = require('../models/todo');

let getAll = function (req, res, next) {
  Todo.find(function (err, todos){
    if(err){
      res.json({error: err});
    } else {
      res.json(todos);
    }
  })
};

let getOne = function(req,res,next){
  Todo.findOne({_id: req.params.id}, function (err, todo) {
    if (err) return handleError(err);
    res.send(todo);
  })
};

let createOne = function (req, res, next) {
  Todo.create({
    content : req.body.content
  }, function (error, todo){
    if(error) throw error;
    res.send(todo);
  })
};

let update = function (req, res, next) {
  let temp = {
    content : req.body.content
  }
  Todo.update({ _id: req.params.id }, { $set: temp}, function(err, response){
    if(err) res.send(err);
    res.send(response);
  });
};

let completingTodo = function (req, res, next) {
  let temp = {
    isComplete : true
  }
  Todo.update({ _id: req.params.id }, { $set: temp}, function(err, response){
    if(err) res.send(err);
    res.send(response);
  });
};

let deleteOne = function (req, res, next) {
  Todo.findOne({_id: req.params.id}).remove(function(err, response){
    if(err) res.send(err);
    res.send(response);
  });
};

module.exports = {
  getAll,
  getOne,
  createOne,
  update,
  completingTodo,
  deleteOne
}
