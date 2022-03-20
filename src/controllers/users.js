const { getUserByEmail, addUser } = require('../models/user');
const { calculateToken } = require('../helpers/auth');
const { ErrorHandler } = require('../helpers/errors');

// Sends an error if the email is already registered in the database
async function emailIsFree(req, _res, next) {
  try {
    // get email from req.body
    const user = req.body;
    // Checks if email already belongs to a registered user
    const userExists = await getUserByEmail(user.email);
    // If email isn't free = Send an error
    if (userExists) {
      next(new ErrorHandler(400, `This user already exists`));
    } else {
      // if email is free, next
      next();
    }
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
}

// Create a new user in the database
async function subscribe(req, res, next) {
  try {
    const user = req.body;
    // Post the new user in the database
    const userCreated = await addUser(user);
    if (userCreated) {
      res.status(200).json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      next(new ErrorHandler(500));
    }
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
}

// Sends an error if the email is not in the database
async function emailExists(req, _res, next) {
  try {
    // get email from req.body
    const user = req.body;
    // Checks if email already belongs to a registered user
    const userExists = await getUserByEmail(user.email);
    // If email doesn't exist, send an error message
    if (!userExists) {
      next(new ErrorHandler(400, `This user doesn't exist`));
    } else {
      // if email is present in the database, next
      next();
    }
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
}

// function login a user from his email/password and sending a JWT token
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    // gets user information from his email
    const user = await getUserByEmail(email);
    if (password != user.password) {
      // passwords don't match, send an authentification error
      throw new ErrorHandler(401, 'Wrong email/password information');
    } else {
      // calculate token from email
      const token = calculateToken(email);
      res.status(200).json({ authJWT: token });
    }
  } catch (err) {
    next(new ErrorHandler(err.statusCode, err.message));
  }
}

module.exports = { emailIsFree, subscribe, emailExists, login };
