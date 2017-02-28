'use strict';
module.exports = function(sequelize, DataTypes) {
  var FbCase = sequelize.define('FbCase', {
    id_facebook: DataTypes.STRING,
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        FbCase.belongsTo(models.Case);
      }
    }
  });
  return FbCase;
};