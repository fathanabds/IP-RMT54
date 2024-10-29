const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
  static async register(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: 'BadRequest', message: 'Email is required' };
      }
      if (!password) {
        throw { name: 'BadRequest', message: 'Password is required' };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const isValidPassword = comparePassword(password, user.password);
        if (isValidPassword) {
          const access_token = signToken({ id: user.id, email: user.email });
          return res.status(200).json({ access_token });
        }
      }
      throw { name: 'Unauthorized' };
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
