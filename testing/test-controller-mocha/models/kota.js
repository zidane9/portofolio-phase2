'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let kotaSchema = new Schema({
  kota_id: {type: String, required: true, unique: true},
  kota_name: {type: String, required: true},
  img: String
});

//the schema is useless so far
//we need to create a model using it
let Kota = mongoose.model('Kota', kotaSchema);

//make this available to our users in our Node Applications
module.exports = Kota;
