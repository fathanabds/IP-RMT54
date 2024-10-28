'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRecipe extends Model {
    static associate(models) {
      UserRecipe.belongsTo(models.User);
      UserRecipe.belongsTo(models.Recipe);
    }
  }
  UserRecipe.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User Id is required',
          },
          notEmpty: {
            msg: 'User Id is required',
          },
        },
      },
      RecipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Recipe Id is required',
          },
          notEmpty: {
            msg: 'Recipe Id is required',
          },
        },
      },
      favorite: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'UserRecipe',
    }
  );
  return UserRecipe;
};
