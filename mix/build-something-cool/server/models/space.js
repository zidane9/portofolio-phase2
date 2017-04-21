'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let spaceSchema = new Schema({
  place: {type: String, required: true, unique: true},
  city: {type: String, required: true},
  capacity: {type: Number, required: true},
  occupied: {type: Number, required: true},
  price: Number,
  address: String
});

//the schema is useless so far
//we need to create a model using it
let Space = mongoose.model('Space', spaceSchema);


module.exports = Space;
