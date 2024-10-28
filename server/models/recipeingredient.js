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
      IngredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Ingredient Id is required',
          },
          notEmpty: {
            msg: 'Ingredient Id is required',
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Amount is required',
          },
          notEmpty: {
            msg: 'Amount is required',
          },
        },
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Unit is required',
          },
          notEmpty: {
            msg: 'Unit is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'RecipeIngredient',
    }
  );
  return RecipeIngredient;
};
