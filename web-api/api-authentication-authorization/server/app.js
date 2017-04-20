'use strict'

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
let Strategy = require('passport-local').Strategy;

let index = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/', index);

app.listen(3000);

module.exports = app;
