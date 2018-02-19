module.exports = {
  path: 'organization(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Organization.js'));
    });
  }
};