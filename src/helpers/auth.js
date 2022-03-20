const jwt = require('jsonwebtoken');
require('dotenv').config();

// calculates JWT token from user email
const calculateToken = (email = '') => {
  return jwt.sign({ email }, process.env.PRIVATE_KEY);
};

module.exports = { calculateToken };
