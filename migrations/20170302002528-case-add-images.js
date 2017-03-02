'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Cases',
      'images',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Cases',
      'images'
    );
  }
};
