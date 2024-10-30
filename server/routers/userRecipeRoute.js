const express = require('express');
const UserRecipeController = require('../controllers/UserRecipeController');
const isOwner = require('../middlewares/isOwner');

const router = express.Router();

// main => /user-recipes
router.post('/', UserRecipeController.create);
router.get('/', UserRecipeController.findOwned);
router.get('/favorite', UserRecipeController.findFavorited);
router.patch('/:id/favorite/', isOwner, UserRecipeController.patchFavorite);
router.patch('/:id/unfavorite/', isOwner, UserRecipeController.patchUnfavorite);
router.delete('/:id', isOwner, UserRecipeController.destroy);

module.exports = router;
