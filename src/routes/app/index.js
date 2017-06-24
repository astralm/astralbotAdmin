module.exports = {
  path: '/app',
  /*getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/foo'),
      ]);
    });
  },*/
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};
