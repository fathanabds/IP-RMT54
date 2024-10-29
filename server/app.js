require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/UserController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.post('/google-login', UserController.googleLogin);

app.use(errorHandler);

module.exports = app;
