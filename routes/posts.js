var express = require('express');
var router = express.Router();

const postsController = require('../server/controllers/post');

router.post('/', postsController.create)
router.get('/', postsController.list)
router.get('/:id', postsController.findById)
router.put('/:id', postsController.update)
router.delete('/:id', postsController.destroy)

module.exports = router;
