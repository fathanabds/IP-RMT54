const { Recipe, UserRecipe } = require('../models');

class UserRecipeController {
  static async create(req, res, next) {
    const { id } = req.user;
    const { title, image, calories, protein, fat, carbs } = req.body;
    try {
      const [recipe, created] = await Recipe.findOrCreate({
        where: { title },
        defaults: {
          title,
          image,
          calories,
          protein,
          fat,
          carbs,
        },
      });
      const userRecipe = await UserRecipe.create({ UserId: id, RecipeId: recipe.id });
      res.status(201).json({ id: userRecipe.id, UserId: userRecipe.UserId, RecipeId: userRecipe.RecipeId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findAll(req, res, next) {}
}

module.exports = UserRecipeController;
