module.exports = {
  path: 'edituser',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EditUser'));
    });
  }
};
