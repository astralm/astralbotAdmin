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
