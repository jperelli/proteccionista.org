'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Cases',
      'location',
      {
        type: Sequelize.GEOGRAPHY
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Cases',
      'location'
    );
  }
};
