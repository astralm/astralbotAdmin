module.exports = {
  path: '/app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/dialog'),
        require('./routes/tableSession'),
        require('./routes/administrators'),
        require('./routes/newuser'),
        require('./routes/edituser'),
        require('./routes/profile'),
        require('./routes/dispatch/'),
        require('./routes/clients/'),
        require('./routes/client/'),
        require('./routes/editclient/'),
        require('./routes/newclient/'),
        require('./routes/organizations/'),
        require('./routes/organization/'),
        require('./routes/editorganization/'),
        require('./routes/neworganization/')
      ]);
    });
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  },
    indexRoute: { onEnter: (nextState, replace) => replace('/app/tableSession') }

};
