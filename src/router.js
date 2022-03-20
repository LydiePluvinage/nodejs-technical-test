const usersController = require('./controllers/users');

const setupRoutes = (server) => {
  // subscribe route goes to users controller. We will register new users here
  server.use('/subscribe', usersController.emailIsFree, usersController.subscribe);
  server.use('/login', usersController.emailExists, usersController.login);
};

module.exports = setupRoutes;
