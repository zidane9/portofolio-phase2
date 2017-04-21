'use strict'

let Space = require('../models/space');

let getAll = function (req, res, next) {
  Space.find(function (err, spaces){
    if(err){
      res.json({error: err});
    } else {
      res.json(spaces);
    }
  })
};

let getByCity = function(req,res,next){
  Space.find({city: req.params.city})
    .exec((err, spaces)=>{
      if(err){
        res.json({error: err});
      } else {
        res.json(spaces);
      }
    })
};

let getOne = function(req,res,next){
  Space.findOne({_id: req.params.id}, function (err, space) {
    if (err) res.send(err);
    else res.send(space);
  })
};

let carIn = function(req,res,next){
  Space.findOne({_id: req.params.id},
    function (err, space) {
      if (err) res.send({error:err});
      else {
      space.occupied += 1;

      space.save(function (err) {
          if(err) {
              console.log(err);
              res.send({error:err});
          } else {
            res.send('Car In Succeed');
          }
      })
    }
  })
};

let carOut = function(req,res,next){
  Space.findOne({_id: req.params.id},
    function (err, space) {
      if (err) res.send({error:err});
      else {
      space.occupied -= 1;

      space.save(function (err) {
          if(err) {
              console.log(err);
              res.send({error:err});
          } else {
            res.send('Car Out Succeed');
          }
      })
    }
  });
}

let createOne = function (req, res, next) {
  Space.create({
    place : req.body.place,
    city : req.body.city,
    capacity: req.body.capacity,
    occupied: 0,
    price: req.body.price,
    address: req.body.address
  }, function (error, space){
    if(error) res.send(error);
    else res.send(space);
  })
};

let update = function (req, res, next) {
  let temp = {
    place : req.body.place,
    city : req.body.city,
    capacity: req.body.capacity,
    occupied: req.body.occupied,
    price: req.body.price,
    address: req.body.address
  }
  Space.update({ _id: req.params.id }, { $set: temp}, function(err, response){
    if(err) res.send(err);
     else res.send(response);
  });
};

let deleteOne = function (req, res, next) {
  Space.findOne({_id: req.params.id}).remove(function(err, response){
    if(err) res.send(err);
    else res.send(response);
  });
};

module.exports = {
  getAll,
  carIn,
  carOut,
  getByCity,
  getOne,
  createOne,
  update,
  deleteOne
}
