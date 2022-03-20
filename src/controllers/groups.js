const groupModel = require('../models/group');
const userModel = require('../models/user');
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

// add a group in the database
async function add(req, res, next) {
  try {
    const group = req.body;
    // Post the new group in the database
    const groupCreated = await groupModel.addGroup(group);
    if (groupCreated) {
      // Group has been created. Add the user in it and send back the list of users
      const usersInGroup = await userModel.addUserInGroup(groupCreated, req.userInfo.email);
      res.status(200).json({ data: { groups: [{ name: group.name, users: [...usersInGroup] }] } });
    } else {
      next(new ErrorHandler(500));
    }
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
}

// add a user in an already created group
async function addUserInGroup(req, res, next) {
  try {
    const { groupId } = req.params;
    // Group has been created. Add the user in it and send back the list of users
    const usersInGroup = await userModel.addUserInGroup(groupId, req.body.email);
    const group = await groupModel.findOne(groupId);
    res.status(200).json({ data: { groups: [{ name: group.name, users: [...usersInGroup] }] } });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
}

module.exports = { findAll, add, addUserInGroup };
