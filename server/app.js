const express = require('express');
require('dotenv').config();
const UserController = require('./controllers/UserController');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/register', UserController.register);
app.post('/login', UserController.login);

app.use(errorHandler);

module.exports = app;
