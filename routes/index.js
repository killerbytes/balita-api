var express = require('express');
var router = express.Router();

const postsController = require('../server/controllers/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/api/posts', postsController.create)
router.get('/api/posts', postsController.list)
router.get('/api/posts/:id', postsController.findById)
router.put('/api/posts/:id', postsController.update)
router.delete('/api/posts/:id', postsController.destroy)
module.exports = router;
