module.exports = {
  path: 'foo',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/foo.js'));
    });
  }
};
