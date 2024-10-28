'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.hasMany(models.RecipeIngredient);
      Recipe.belongsTo(models.User);
      Recipe.belongsToMany(models.Ingredient, { through: 'RecipeIngredients' });
    }
  }
  Recipe.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title is required',
          },
          notEmpty: {
            msg: 'Title is required',
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Image Url is required',
          },
          notEmpty: {
            msg: 'Image Url is required',
          },
        },
      },
      favorite: DataTypes.BOOLEAN,
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
    },
    {
      sequelize,
      modelName: 'Recipe',
    }
  );
  return Recipe;
};
