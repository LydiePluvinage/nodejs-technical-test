const connection = require('../db-config');

const getUserByEmail = (email) => {
  return connection
    .promise()
    .query(
      'SELECT email, password, firstName, lastName FROM users WHERE email = ?',
      [email]
    )
    .then(([results]) => results[0]);
};

const addUser = async (user) => {
  return connection
    .promise()
    .query(
      'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
      [user.firstName, user.lastName, user.email, user.password]
    )
    .then(([results]) => results.insertId);
};

module.exports = { getUserByEmail, addUser };
