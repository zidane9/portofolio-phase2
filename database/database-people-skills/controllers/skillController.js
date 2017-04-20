'use strict'

let Skill = require('../models/skill');
let skillsSeeder = require('../seeders/skills.json');

let seedingSkills = function(req, res) {
  Skill.collection.insert(skillsSeeder, function(err,results) {
    if(err) {
      res.send(err);
    } else {
      res.send(results)
    }
  })
}

let getAll = function (req, res, next) {
  Skill.find(function (err, skills){
    if(err){
      res.json({error: err});
    } else {
      res.json(skills);
    }
  })
};

let getOne = function(req,res,next){
  Skill.findOne({_id: req.params.id}, function (err, skill) {
    if (err) res.send(err);
    else res.send(skill);
  })
};

let createOne = function (req, res, next) {
  Skill.create({
    name : req.body.name,
  }, function (error, skill){
    if(error) res.send(error);
    else res.send(skill);
  })
};

let update = function (req, res, next) {
  let temp = {
    name : req.body.name,
  }
  Skill.update({ _id: req.params.id }, { $set: temp}, function(err, response){
    if(err) res.send(err);
    else res.send(response);
  });
};

let deleteOne = function (req, res, next) {
  Skill.findOne({_id: req.params.id}).remove(function(err, response){
    if(err) res.send(err);
    res.send(response);
  });
};

module.exports = {
  seedingSkills,
  getAll,
  getOne,
  createOne,
  update,
  deleteOne
}
