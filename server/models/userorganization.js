'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserOrganization = sequelize.define('UserOrganization', {
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER
  }, {});
  UserOrganization.associate = function(models) {
    // associations can be defined here
  };
  return UserOrganization;
};