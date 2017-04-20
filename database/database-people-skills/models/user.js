'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let userSchema = new Schema({
  // isbn: {type: String, required: true, unique: true},
  name : {
    type: String,
    required: true
  },
  skillList: [{
    grade: Number,
    skill: {
      type: Schema.Types.ObjectId,
      ref: 'Skill'
    }
  }]
});

//the schema is useless so far
//we need to create a model using it
let User = mongoose.model('User', userSchema);

//make this available to our users in our Node Applications
module.exports = User;
