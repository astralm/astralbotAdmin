module.exports = {
  path: 'client(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Client'));
    });
  }
};