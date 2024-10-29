const { UserRecipe } = require('../models');

async function isOwner(req, res, next) {
  try {
    const userRecipe = await UserRecipe.findByPk(req.params.id);
    if (!userRecipe) {
      throw { name: 'NotFound' };
    }
    if (userRecipe.UserId == req.user.id) {
      return next();
    } else {
      throw { name: 'Forbidden' };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = isOwner;
