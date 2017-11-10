module.exports = {
  path: 'organizations',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Organizations.js'));
    });
  }
};