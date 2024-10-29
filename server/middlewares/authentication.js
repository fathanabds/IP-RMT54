const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
  const bearerToken = req.headers.authorization;
  try {
    if (bearerToken) {
      const token = bearerToken.split(' ')[1];
      if (token) {
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id, {
          attributes: { exclude: ['email', 'password'] },
        });
        if (user) {
          req.user = user;
          return next();
        }
      }
    }
    throw { name: 'JsonWebTokenError' };
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
