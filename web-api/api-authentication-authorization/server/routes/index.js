'use strict'

const express = require('express');
let router = express.Router();
let controller = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash-and-salt');
const passport = require('passport');
let Strategy = require('passport-local').Strategy;
let User = require('../models/user');
let Helpers = require('../helpers/authentication');
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Welcome' });
  res.send('Working');
});

// router.get('/signup', function(req, res, next) {
//   res.render('signup', { title: 'Sign Up' });
// });
//
// router.get('/login', function(req, res, next) {
//   res.render('signup', { title: 'Login' });
// });

router.get('/users',Helpers.authenticate, controller.getAll);

router.post('/signup', controller.createOne);

passport.use(new Strategy(
  function(username,password,cb){
    console.log('---',username);
    User.findOne({email: username}, function (err, user) {
    if (err) cb(err);

      console.log(user);
    if(!user){
      cb(null,false);
    }
    else {
      console.log('-xx');
    // Verifying a hash
      passwordHash(password).verifyAgainst(user.password, function(error, verified) {
          if(error)
              throw new Error('Something went wrong!');
          if(!verified) {
              cb("Email or password invalid!");
          } else {
            let token = jwt.sign({
              email: username
              },
              process.env.SECRET,
              {expiresIn: '1h'});
            cb(null, token);
          }
      });
    }
  }
)
}));

router.use(passport.initialize());

router.post('/login', passport.authenticate('local', {session:false}), function(req,res){
  res.send(req.user);
})

module.exports = router;
