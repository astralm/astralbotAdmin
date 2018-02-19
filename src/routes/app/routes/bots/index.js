module.exports = {
  path: 'bots',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Bots'));
    });
  }
};
