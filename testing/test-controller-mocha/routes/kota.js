'use strict'
var express     = require('express');
var router      = express.Router();
var controller  = require('../controllers/kotaController');
var helper      = require('../helper/helper');
var aut         = require('../helper/auth');

/* GET home page. */
router.get('/',  controller.getAll);
router.post('/', controller.createOne);
router.put('/:kota_id', aut.authToken, controller.update);
router.delete('/:kota_id', aut.authToken, controller.deleteOne);
router.use('/search', aut.authToken, helper.cityFind);
router.use('/result', aut.authToken, controller.find);

module.exports = router;
