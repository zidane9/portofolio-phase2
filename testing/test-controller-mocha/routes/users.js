'use strict'
const express   = require('express');
let router      = express.Router();
let controller  = require('../controllers/userController');
var aut         = require('../helper/auth');
/* GET home page. */
router.get('/',  controller.getAll);
router.post('/', controller.createOne);
router.put('/:username', aut.authToken, controller.update);
router.delete('/:username', aut.authToken, controller.deleteOne);


module.exports = router;
