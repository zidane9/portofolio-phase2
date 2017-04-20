'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let wisataSchema = new Schema({
  name: {type: String, required: true},
  address: String,
  geoloc: String,
  img: String,
  kota: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Kota' }
});

//the schema is useless so far
//we need to create a model using it
let Wisata = mongoose.model('Wisata', wisataSchema);

//make this available to our users in our Node Applications
module.exports = Wisata;
