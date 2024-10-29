require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/UserController');
const errorHandler = require('./middlewares/errorHandler');
const authentication = require('./middlewares/authentication');
const UserRecipeController = require('./controllers/UserRecipeController');
const isOwner = require('./middlewares/isOwner');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.post('/google-login', UserController.googleLogin);

app.use(authentication);

app.post('/user-recipes', UserRecipeController.create);
app.get('/user-recipes', UserRecipeController.findAll);

app.delete('/user-recipes/:id', isOwner);

app.use(errorHandler);

module.exports = app;
