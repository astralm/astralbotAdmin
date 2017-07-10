module.exports = {
  path: 'administrators',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Administrators'));
    });
  }
};
