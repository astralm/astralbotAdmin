module.exports = {
  path: '/app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/dialog'),
        require('./routes/tableSession'),
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
