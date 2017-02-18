'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'Cases',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          id_facebook: {
            type: Sequelize.ARRAY(Sequelize.STRING)
          },
          title: {
            type: Sequelize.STRING
          },
          description: {
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
        },
        {
          transaction: t
        }
      ).then(function () {
        return queryInterface.addColumn(
          'Cases',
          'animal_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Animals",
              key: "id"
            },
            allowNull: false
          }, 
          {
            transaction: t
          }
        );
      });
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Cases');
  }
};