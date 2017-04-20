'use strict'

let Eo = require('../models/eo');

let getAll = function (req, res, next) {
  Eo.find(function (err, eos){
    if(err){
      res.json({error: err});
    } else {
      res.json(eos);
    }
  })
};

let getOne = function(req,res,next){
  Eo.findOne({_id: req.params.id}, function (err, eo) {
    if (err) return res.json({error: err});
    else res.send(eo);
  })
};

let createOne = function (req, res, next) {
  Eo.create({
    date : req.body.date,
    title : req.body.title,
    name : req.body.name,
    email : req.body.email
  }, function (error, eo){
    if(error) res.json({error: error});
    else res.send(eo);
  })
};

let update = function (req, res, next) {
  let temp = {
    date : req.body.date,
    title : req.body.title,
    name : req.body.name,
    email : req.body.email
  }
  Eo.update({ _id: req.params.id }, { $set: temp}, function(err, response){
    if(err) res.json({error: err});
    else res.send(response);
  });
};

let deleteOne = function (req, res, next) {
  Eo.findOne({_id: req.params.id}).remove(function(err, response){
    if(err) res.json({error: err});
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
