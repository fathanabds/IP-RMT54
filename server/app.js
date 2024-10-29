const express = require('express');
require('dotenv').config();
const UserController = require('./controllers/UserController');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/register', UserController.register);
app.post('/login', UserController.login);

app.use(errorHandler);

module.exports = app;
