const usersController = require('./controllers/users');
const authController = require('./helpers/auth');

const setupRoutes = (server) => {
  // subscribe route goes to users controller. We will register new users here
  server.post('/subscribe', usersController.emailIsFree, usersController.subscribe);
  server.post('/login', usersController.emailExists, usersController.login);
  server.get('/users', authController.checkAuthorization, usersController.findAll);
};

module.exports = setupRoutes;
