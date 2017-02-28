'use strict';
module.exports = function(sequelize, DataTypes) {
  var FbCase = sequelize.define('FbCase', {
    id_facebook: DataTypes.STRING,
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        FbCase.belongsTo(models.Case);
        FbCase.belongsTo(models.User, {foreignKey: 'created_by_user_id', as: 'created_by_user'});
      }
    }
  });
  return FbCase;
};