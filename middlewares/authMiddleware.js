require('dotenv').config();
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({message: 'User is not authorized'});
    }
    const token = req.headers.authorization.split(' ')[1];
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Authorization middleware error'});
  }
};
