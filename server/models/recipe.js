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
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      favorite: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Recipe',
    }
  );
  return Recipe;
};
