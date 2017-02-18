'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'Issues',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          type: {
            type: Sequelize.ENUM(
              'Encontrado',
              'Perdido',
              'Traslado',
              'Tránsito',
              'Adopción',
              'Colaboración Económica',
              'Tratamiento'
            )
          },
          solved_on: {
            type: Sequelize.DATE
          },
          description: {
            type: Sequelize.TEXT
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE
          }
        },
        {
          transaction: t
        }
      ).then(function () {
        return queryInterface.addColumn(
          'Issues',
          'case_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Cases",
              key: "id"
            },
            allowNull: false
          }, 
          {
            transaction: t
          }
        );
      });
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Issues');
  }
};