'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    static associate(models) {
      RecipeIngredient.belongsTo(models.Recipe);
      RecipeIngredient.belongsTo(models.Ingredient);
    }
  }
  RecipeIngredient.init(
    {
      RecipeId: DataTypes.INTEGER,
      IngredientId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RecipeIngredient',
    }
  );
  return RecipeIngredient;
};
