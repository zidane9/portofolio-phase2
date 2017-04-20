'use strict'

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

let index = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/memo');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/', index);

app.listen(3000);

module.exports = app;
