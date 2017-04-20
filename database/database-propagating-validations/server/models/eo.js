'use strict'

const mongoose = require('mongoose');
const validators = require('mongoose-validators')
let Schema = mongoose.Schema;

//create a Schema
let eoSchema = new Schema({
  date: {
    type: Date,
    required: true['date is required'],
    validate: validators.isDate({message: "Wrong Date Format"})
  },
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: [true, 'This title is already used']
  },
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    validate: validators.isEmail({message: "Wrong Email Format"})
}
});

//the schema is useless so far
//we need to create a model using it
let Eo = mongoose.model('Eo', eoSchema);

//make this available to our users in our Node Applications
module.exports = Eo;
