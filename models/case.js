'use strict';
module.exports = function(sequelize, DataTypes) {
  var Case = sequelize.define('Case', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Case.hasMany(models.Issue);
        Case.hasMany(models.FbCase, {foreignKey: 'created_by_user_id'});
        Case.belongsTo(models.Animal);
      }
    }
  });
  return Case;
};