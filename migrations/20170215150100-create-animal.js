'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.ENUM(
          'Chico',
          'Mediano',
          'Grande'
        )
      },
      sex: {
        type: Sequelize.ENUM(
          'Hembra',
          'Macho'
        )
      },
      race: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.ENUM(
          'Cachorro',
          'Adulto',
          'Anciano'
        )
      },
      owner: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Animals');
  }
};