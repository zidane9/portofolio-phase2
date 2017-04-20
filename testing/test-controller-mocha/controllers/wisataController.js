'use strict'
const googleMapsClient  = require('@google/maps').createClient({key:process.env.MAPSCLIENT});
let Wisata = require('../models/wisata');

let getAll = function (req, res, next) {
  Wisata.find()
  .populate('kota',['kota_id','kota_name'])
  .exec(function (err, instances) {
    if (err) res.send(err);
    else res.send(instances);
  })
};
let createOne = function (req, res, next) {
  Wisata.create({
    name: req.body.name,
    address: req.body.address,
    img: req.body.img,
    kota: req.body.kota
  }, function (error, wisata){
    if(error) res.send(error)
    else res.send(wisata);
  })
};
let update = function (req, res, next) {
  Wisata.findOne({_id: req.params.id}, function (err, wisata) {
    if (err) res.send(err);
    else if(!wisata) res.send({errors: 'Wisata not found'})
    else {
      if(req.body.name) wisata.name = req.body.name;
      if(req.body.address) wisata.address = req.body.address;
      if(req.body.kota) wisata.kota = req.body.kota;
      if(req.body.img) wisata.img = req.body.img;
      wisata.save(function (err, updatedWisata) {
        if (err) res.send(err);
        else res.send(updatedWisata);
      });
    }
  });
};
let deleteOne = function (req, res, next) {
  Wisata.findOne({_id: req.params.id}).remove(function(err,respond){
    if(err) res.send(err);
    else res.send(respond);
  })
};
let find = function (req,res,next) {
  googleMapsClient.geocode({
    address: req.query.input
  }, function(err, response) {
    if (!err) {
      res.send(response.json.results);
    }
  });
}

module.exports = {
  getAll,
  createOne,
  update,
  deleteOne,
  find
}
