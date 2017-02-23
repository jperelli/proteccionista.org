'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'fb_groups',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Users',
      'fb_groups'
    );
  }
};
