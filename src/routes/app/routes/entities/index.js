module.exports = {
  path: 'entities(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Entities'));
    });
  }
};