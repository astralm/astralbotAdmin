module.exports = {
  path: 'client',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Client'));
    });
  }
};