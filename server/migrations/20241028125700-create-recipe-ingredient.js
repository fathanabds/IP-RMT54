'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecipeIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      RecipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Recipes',
          },
          key: 'id',
        },
      },
      IngredientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Ingredients',
          },
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      unit: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RecipeIngredients');
  },
};
