'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

let index = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/parking-finder');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/', index);

app.listen(3000, function(){
  console.log('listening to port 3000');
});

module.exports = app;
