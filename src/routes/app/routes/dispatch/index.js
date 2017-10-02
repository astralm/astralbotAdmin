module.exports = {
  path: 'dispatch',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Dispatch'));
    });
  }
};
