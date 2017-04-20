'use strict'

const express = require('express');
const router = express.Router();

router.get('/colors', function(req,res){
  let data = {box: getRandomBox(),
              color: getRandomColor()};
  res.send(data);
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomBox(){
  let box = Math.round(Math.random()*8);
  return box;
}

module.exports = router;
