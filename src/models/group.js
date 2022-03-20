const connection = require('../db-config');

// gets all groups
async function findAll() {
  return connection
    .promise()
    .query('SELECT name FROM userGroups')
    .then(([results]) => results);
}

module.exports = { findAll };
