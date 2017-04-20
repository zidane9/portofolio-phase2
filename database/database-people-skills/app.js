'use strict'

const express = require('express');
const path = require('path');
// const cors = require('cors');
const bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');
let skills = require('./routes/skills');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/people-skills');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/skills', skills);

app.listen(3000);

module.exports = app;
