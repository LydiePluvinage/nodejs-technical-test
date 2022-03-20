const { getUserByEmail, addUser } = require('../models/user');
const { ErrorHandler } = require('../helpers/errors');

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

module.exports = { emailIsFree, subscribe };
