'use strict'
var express     = require('express');
var router      = express.Router();
var controller  = require('../controllers/wisataController');
var helper      = require('../helper/helper');
var aut         = require('../helper/auth');

/* GET home page. */
router.get('/', controller.getAll);
router.post('/', controller.createOne);
router.put('/:id', aut.authToken, controller.update);
router.delete('/:id', aut.authToken, controller.deleteOne);
// router.use('/search', aut.authToken, helper.placeFind);
// router.use('/result', aut.authToken, controller.find);

module.exports = router;
