'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let memoSchema = new Schema({
  // isbn: {type: String, required: true, unique: true},
  title : {
    type: String,
    required: true
  },
  content : {
    type: String,
    required: true
  }
});

//the schema is useless so far
//we need to create a model using it
let Memo = mongoose.model('Memo', memoSchema);

//make this available to our users in our Node Applications
module.exports = Memo;
