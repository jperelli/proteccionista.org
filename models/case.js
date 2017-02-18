'use strict';
module.exports = function(sequelize, DataTypes) {
  var Case = sequelize.define('Case', {
    id_facebook: DataTypes.ARRAY(DataTypes.STRING),
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Case.hasMany(models.Issue);
        Case.belongsTo(models.Animal);
      }
    }
  });
  return Case;
};