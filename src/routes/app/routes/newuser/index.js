module.exports = {
  path: 'newuser',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NewUser'));
    });
  }
};
