'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: String,
  name: String,
  email: String,
  phone: String
});

//the schema is useless so far
//we need to create a model using it
let User = mongoose.model('User', userSchema);

//make this available to our users in our Node Applications
module.exports = User;
