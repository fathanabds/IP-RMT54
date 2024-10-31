const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');

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

  static async googleLogin(req, res, next) {
    const { token } = req.headers;
    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: 'password-google',
        },
        hooks: false,
      });
      const access_token = signToken({ id: user.id, email: user.email });
      return res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async gitHubLogin(accessToken, refreshToken, profile, done) {
    try {
      console.log('🚀 ~ UserController ~ gitHubLogin ~ profile:', profile);
      // const [user, created] = await User.findOrCreate({
      //   where: { email: profile.username },
      //   defaults: {
      //     email: profile.username,
      //     password: 'password-github',
      //   },
      //   hooks: false,
      // });
      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
