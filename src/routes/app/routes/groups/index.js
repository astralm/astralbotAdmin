module.exports = {
  path: 'groups(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Groups'));
    });
  }
};