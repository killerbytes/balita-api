const Post = require('../models').Post;

module.exports = {
  create(req, res) {
    return Post
      .create({
        title: req.body.title,
        content: req.body.content
      })
      .then(post => res.status(201).send(post))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Post
      .all()
      .then(posts => res.status(200).send(posts))
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