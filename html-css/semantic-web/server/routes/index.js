'use strict'

const express = require('express');
let router = express.Router();
let controller = require('../controllers/spaceController');


/* GET home page. */
router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.get('/city/:city', controller.getByCity);

router.post('/', controller.createOne);

router.post('/in/:id', controller.carIn);

router.post('/out/:id', controller.carOut);

router.put('/:id', controller.update);

router.delete('/:id', controller.deleteOne);

module.exports = router;
