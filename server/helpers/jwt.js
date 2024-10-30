const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

function signToken(data) {
  return jwt.sign(data, JWT_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_KEY);
}

module.exports = { signToken, verifyToken };
