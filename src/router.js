const usersController = require('./controllers/users');
const groupsController = require('./controllers/groups');
const authController = require('./helpers/auth');

const setupRoutes = (server) => {
  // subscribe route goes to users controller. We will register new users here
  server.post('/subscribe', usersController.emailIsFree, usersController.subscribe);
  // login route. From an email/password couple, users will be logged and receive their token
  server.post('/login', usersController.emailExists, usersController.login);
  // displays list of users minus the person asking
  server.get('/users', authController.checkAuthorization, usersController.findAll);
  // displays list of groups
  server.get('/groups', authController.checkAuthorization, groupsController.findAll);
};

module.exports = setupRoutes;
