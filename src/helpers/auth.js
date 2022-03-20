const { ErrorHandler } = require('./errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// calculates JWT token from user email
const calculateToken = (email = '') => {
  return jwt.sign({ email }, process.env.PRIVATE_KEY);
};

// get authorization information
const checkAuthorization = (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    next(new ErrorHandler(401, 'Unauthorized user, please login'));
  } else {
    const token = req.headers.authorization.split(' ')[1] || '';
    req.userInfo = jwt.verify(token, process.env.PRIVATE_KEY);
    if (req.userInfo === undefined) {
      next(new ErrorHandler(401, 'Unauthorized user, please login'));
    } else {
      next();
    }
  }
};

module.exports = { calculateToken, checkAuthorization };
