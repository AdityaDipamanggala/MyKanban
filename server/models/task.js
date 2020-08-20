'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User)
    Task.belongsTo(models.Organization)
  };
  return Task;
};