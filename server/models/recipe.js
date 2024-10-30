'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.hasMany(models.UserRecipe);
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
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Calories is required',
          },
          notEmpty: {
            msg: 'Calories is required',
          },
        },
      },
      protein: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Protein is required',
          },
          notEmpty: {
            msg: 'Protein is required',
          },
        },
      },
      fat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Fat is required',
          },
          notEmpty: {
            msg: 'Fat is required',
          },
        },
      },
      carbs: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Carbs is required',
          },
          notEmpty: {
            msg: 'Carbs is required',
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
