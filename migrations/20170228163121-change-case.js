'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Cases',
      'description',
      Sequelize.TEXT
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Cases',
      'description',
      Sequelize.STRING
    )
  }
};
