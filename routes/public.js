var express = require('express');
var router = express.Router();

const publicController = require('../server/controllers/public');

router.get('/posts', publicController.list)
router.get('/posts/:id', publicController.findById)

module.exports = router;
