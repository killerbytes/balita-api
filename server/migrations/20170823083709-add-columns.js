'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [

      queryInterface.addColumn('Posts',
        'region', {
          type: Sequelize.STRING
        }),

      queryInterface.addColumn('Posts',
        'isPublished', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }),

      queryInterface.addColumn('Posts',
        'isDeleted', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        })
    ]
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
