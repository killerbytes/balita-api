const Post = require('../models').Post;

module.exports = {

  list(req, res) {
    const {query} = req
    const defaultLimit = 10
    const params = {
      limit: query.limit || defaultLimit,
      offset: query.page * (query.limit||defaultLimit) || 0,
      order: [['postedAt', 'DESC']],
      where: {isPublished: true}
    }
    
    return Post
      .findAndCountAll(params)
      .then(posts => {
        posts.page = params.offset / params.limit
        posts.isMore = (posts.count - (posts.page * params.limit)) > params.limit
        posts.rows = posts.rows.map(function(post){
          return {
            id: post.id,
            title: post.title,
            content: post.content.length > 200 ? post.content.substr(0,200) + '...' : post.content,
            postedAt: post.postedAt
          }
        })
        return res.status(200).send(posts)
      })
      .catch(error => res.status(400).send(error));
  },  

  findById(req, res) {
    return Post
      .findOne({
        where: {id: req.params.id, isPublished: true}
      })
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
};