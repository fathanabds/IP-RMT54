if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(require('./routers'));

app.use(errorHandler);

module.exports = app;
