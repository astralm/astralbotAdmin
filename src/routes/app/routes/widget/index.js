module.exports = {
  path: 'widget',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Widget.js'));
    });
  }
};