'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model {}
  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          message : `Please fill your name`
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : false,
          message : `Incorrect Email Format`
        },
        notEmpty : {
          args : true,
          message : `Please fill your username`
        }
      },
      unique : {
        args : true,
        message : `Email address has been used`
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          message : `Please fill your password`
        }
      }
    }
  },{sequelize})

  User.beforeCreate((instance,options) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password,salt)
    instance.password = hash
  })

  User.associate = function(models) {
    User.belongsToMany(models.Organization,{through : "UserOrganization"})
  };
  return User;
};