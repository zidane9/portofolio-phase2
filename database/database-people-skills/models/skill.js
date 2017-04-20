'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let skillSchema = new Schema({
  // isbn: {type: String, required: true, unique: true},
  name : {
    type: String,
    required: true,
    unique: true
  }
});

//the schema is useless so far
//we need to create a model using it
let Skill = mongoose.model('Skill', skillSchema);

//make this available to our users in our Node Applications
module.exports = Skill;
