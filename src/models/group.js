const connection = require('../db-config');

// gets all groups
async function findAll() {
  return connection
    .promise()
    .query('SELECT name FROM userGroups')
    .then(([results]) => results);
}

// add a new group in the database
async function addGroup(group) {
  return connection
    .promise()
    .query('INSERT INTO userGroups (name) VALUES (?)', [group.name])
    .then(([results]) => results.insertId);
}

// gets group name and its users
async function findOne(groupId) {
  return connection
    .promise()
    .query('SELECT name FROM userGroups WHERE idGroup= ?', [groupId])
    .then(([results]) => results[0]);
}

module.exports = { findAll, addGroup, findOne };
