const Post = require('../models').Post;

module.exports = {
  create(req, res) {
    return Post
      .create({
        title: req.body.title,
        content: req.body.content,
        postedAt: req.body.postedAt,
        region: req.body.reqion,
        isPublished: req.body.isPublished.toString(),        
      })
      .then(post => res.status(201).send(post))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const {query} = req
    const params = {
      limit: query.limit || 10,
      offset: query.page * (query.limit||10) || 0,
      order: [['postedAt', 'DESC']]
    }
    
    return Post
      .findAndCountAll(params)
      .then(posts => {
        posts.rows = posts.rows.map(function(post){
          post.content = post.content.substr(0,200)
          return post
        })
        // posts.forEach(function(element) {
        //   console.log(element.id)
        // }, this);

        return res.status(200).send(posts)
      })
      .catch(error => res.status(400).send(error));
  },  

  findById(req, res) {
    return Post
      .findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: 'Post Not Found',
          });
        }
        return res.status(200).send(post);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Post
      .findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: 'Post Not Found',
          });
        }
        return post
          .update({
            title: req.body.title || post.title,
            content: req.body.content || post.content,
            postedAt: req.body.postedAt || post.postedAt,
            region: req.body.region || post.region,
            isPublished: req.body.isPublished.toString() || post.isPublished,
            isDeleted: req.body.isDeleted.toString() || post.isDeleted
          })
          .then(() => res.status(200).send(post))  // Send back the updated post.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },  

  destroy(req, res) {
    return Post
      .findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(400).send({
            message: 'Post Not Found',
          });
        }
        return post
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};