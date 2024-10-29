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

  static async findAll(req, res, next) {
    const { id } = req.user;
    try {
      const recipes = await UserRecipe.findAll({
        where: {
          UserId: id,
        },
        include: Recipe,
      });
      res.json(recipes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      req.userRecipe.destroy();
      res.json({ message: 'Recipe has been deleted' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchFavorite(req, res, next) {
    try {
      req.userRecipe.update({
        favorite: true,
      });
      res.json({ message: 'Recipe has been added to favorite' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchUnfavorite(req, res, next) {
    try {
      req.userRecipe.update({
        favorite: false,
      });
      res.json({ message: 'Recipe has been removed from favorite' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserRecipeController;
