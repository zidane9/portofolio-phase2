'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoController');

router.get('/', controller.getAll);
router.post('/', controller.createOne);
router.put('/complete/:id', controller.completingTodo);
router.delete('/:id', controller.deleteOne);

module.exports = router;
