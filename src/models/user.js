const connection = require('../db-config');

function getUserByEmail(email) {
  return connection
    .promise()
    .query(
      'SELECT email, password, firstName, lastName FROM users WHERE email = ?',
      [email]
    )
    .then(([results]) => results[0]);
}

async function addUser(user) {
  return connection
    .promise()
    .query(
      'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
      [user.firstName, user.lastName, user.email, user.password]
    )
    .then(([results]) => results.insertId);
}

module.exports = { getUserByEmail, addUser };
