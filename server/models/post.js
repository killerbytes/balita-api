'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    postedAt: DataTypes.DATE,
    region: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Post;
};