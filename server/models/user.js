'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserRecipe);
    }
  }
  User.init(
    {
      email: {
        unique: {
          msg: 'Email must be unique',
        },
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Invalid email format',
          },
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email is required',
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is required',
          },
          notEmpty: {
            msg: 'Name is required',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: 'Minimum password length is 6 characters',
          },
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
