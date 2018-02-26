module.exports = {
  path: 'newbot',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Newbot'));
    });
  }
};
