'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a Schema
let todoSchema = new Schema({
  content: {
    type: String,
    required: [true, 'todo cannot be empty']
  },
  isComplete: {
    type: Boolean,
    default: false
  }
});

//the schema is useless so far
//we need to create a model using it
let Todo = mongoose.model('Todo', todoSchema);

//make this available to our users in our Node Applications
module.exports = Todo;
