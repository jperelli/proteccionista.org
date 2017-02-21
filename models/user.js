'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    fb_id: DataTypes.STRING,
    fb_access_token: DataTypes.STRING,
  }, {
    underscored: true
  });
  return User;
};