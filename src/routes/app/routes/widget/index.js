module.exports = {
  path: 'widgets',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Widget.js'));
    });
  }
};