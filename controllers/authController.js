require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const salt = 5;

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret);
};

class AuthController {
  async register(req, res) {
    try {
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        return res.status(400).json({
          message: `User with name '${username}' already exists`,
        });
      }
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = new User({
        username,
        password: hashPassword,
        createdDate: Date.now()});
      await user.save();
      res.json({message: 'Success'});
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'Registration failed'});
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({
          message: `User with name '${username}' does not exist`,
        });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: 'Invalid password'});
      }
      const token = generateAccessToken(user._id);
      res.json({
        message: 'Success',
        jwt_token: token,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'Login failed'});
    }
  }
}

module.exports = new AuthController();
