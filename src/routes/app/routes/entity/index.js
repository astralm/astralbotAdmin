module.exports = {
  path: 'entity(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Entity'));
    });
  }
};