module.exports = {
  path: 'organization',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Organization.js'));
    });
  }
};