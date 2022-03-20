const connection = require('../db-config');

// gets a user from his email
function getUserByEmail(email) {
  return connection
    .promise()
    .query('SELECT email, password, firstName, lastName FROM users WHERE email = ?', [email])
    .then(([results]) => results[0]);
}

// create a user in the database
async function addUser(user) {
  return connection
    .promise()
    .query('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
    ])
    .then(([results]) => results.insertId);
}

// gets all users information minus the one in parameter
async function findAll(email) {
  return connection
    .promise()
    .query('SELECT email, firstName, lastName FROM users WHERE email != ?', [email])
    .then(([results]) => results);
}

module.exports = { getUserByEmail, addUser, findAll };
