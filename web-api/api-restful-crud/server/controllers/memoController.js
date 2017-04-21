'use strict'

let Memo = require('../models/memo');

let getAll = function (req, res, next) {
  Memo.find(function (err, memos){
    if(err){
      res.json({error: err});
    } else {
      res.json(memos);
    }
  })
};

let getOne = function(req,res,next){
  Memo.findOne({_id: req.params.id}, function (err, memo) {
    if (err) res.send(err);
    else res.send(memo);
  })
};

let createOne = function (req, res, next) {
  Memo.create({
    title : req.body.title,
    content : req.body.content,
  }, function (error, memo){
    if(error) res.send(error);
    else res.send(memo);
  })
};

let update = function (req, res, next) {
  let temp = {
    title : req.body.title,
    content : req.body.content,
  }
  Memo.update({ _id: req.params.id }, { $set: temp}, function(err, response){
    if(err) res.send(err);
     else res.send(response);
  });
};

let deleteOne = function (req, res, next) {
  Memo.findOne({_id: req.params.id}).remove(function(err, response){
    if(err) res.send(err);
    else res.send(response);
  });
};

module.exports = {
  getAll,
  getOne,
  createOne,
  update,
  deleteOne
}
