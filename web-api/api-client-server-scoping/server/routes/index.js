'use strict'

const express = require('express');
let router = express.Router();
let Meal = require('../models/meal');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Welcome' });
  res.send(Meal.list())
});


module.exports = router;
