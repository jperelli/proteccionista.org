'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'FbCases',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          id_facebook: {
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
          'FbCases',
          'case_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Cases",
              key: "id"
            },
            allowNull: true
          },
          {
            transaction: t
          }
        );
      }).then(function () {
        return queryInterface.addColumn(
          'FbCases',
          'created_by_user_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id"
            },
            allowNull: true
          },
          {
            transaction: t
          }
        );
      }).then(function () {
        return queryInterface.removeColumn(
          'Cases',
          'id_facebook',
          {
            transaction: t
          }
        );
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('FbCases').then(function (){
      return queryInterface.addColumn(
        'Cases',
        'id_facebook',
        Sequelize.ARRAY(Sequelize.STRING)
      )
    });
  }
};
