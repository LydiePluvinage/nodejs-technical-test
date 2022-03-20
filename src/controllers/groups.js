const groupModel = require('../models/user');
const { ErrorHandler } = require('../helpers/errors');

// gets all groups information
async function findAll(req, res, next) {
  try {
    // gets groups list
    const groups = await groupModel.findAll();
    res.status(200).json({ data: { groups: groups } });
  } catch (err) {
    next(new ErrorHandler(err.statusCode, err.message));
  }
}

module.exports = { findAll };
