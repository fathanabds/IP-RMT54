'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      Ingredient.hasMany(models.RecipeIngredient);
      Ingredient.belongsToMany(models.Recipe, { through: 'RecipeIngredients' });
    }
  }
  Ingredient.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Ingredient',
    }
  );
  return Ingredient;
};
