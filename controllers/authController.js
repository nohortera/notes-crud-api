require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const {secret} = require('../config')
const secret = process.env.SECRET_KEY;
const salt = 5;

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret);
};

// eslint-disable-next-line require-jsdoc
class AuthController {
  // eslint-disable-next-line require-jsdoc
  async register(req, res) {
    try {
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        // eslint-disable-next-line max-len
        res.status(400).json({message: `User with name '${username}' already exsists`});
      }
      const hashPassword = bcrypt.hashSync(password, salt);
      // eslint-disable-next-line max-len
      const user = new User({username, password: hashPassword, createdDate: Date.now()});
      await user.save();
      res.json({message: 'Success'});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Resgistration failed'});
    }
  }
  // eslint-disable-next-line require-jsdoc
  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        // eslint-disable-next-line max-len
        res.status(400).json({message: `User with name '${username}' does not exist`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(400).json({message: 'Invalid password'});
      }
      const token = generateAccessToken(user._id);
      res.json({
        message: 'Success',
        jwt_token: token,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Login failed'});
    }
  }
}

module.exports = new AuthController();
