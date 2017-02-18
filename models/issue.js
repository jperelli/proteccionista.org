'use strict';
module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define('Issue', {
    type: DataTypes.ENUM(
      'Encontrado',
      'Perdido',
      'Traslado',
      'Tránsito',
      'Adopción',
      'Colaboración Económica',
      'Tratamiento'
    ),
    solved_on: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Issue.belongsTo(models.Case);
      }
    }
  });
  return Issue;
};