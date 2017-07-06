module.exports = {
  path: 'newworker',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/newworker'));
    });
  }
};
