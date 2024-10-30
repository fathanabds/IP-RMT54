const express = require('express');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);

router.use(authentication);

router.use('/user-recipes', require('./userRecipeRoute'));

module.exports = router;
