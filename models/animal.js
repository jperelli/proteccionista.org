'use strict';
module.exports = function(sequelize, DataTypes) {
  var Animal = sequelize.define('Animal', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    owner: DataTypes.STRING,
    race: DataTypes.STRING,
    size: DataTypes.ENUM(
        'Chico',
        'Mediano',
        'Grande'
      ),
    sex: DataTypes.ENUM(
        'Hembra',
        'Macho'
      ),
    age: DataTypes.ENUM(
      'Cachorro',
      'Adulto',
      'Anciano'
    )
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Animal.hasMany(models.Case);
      }
    }
  });
  return Animal;
};