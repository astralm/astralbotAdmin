module.exports = {
  path: 'editClient',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EditClient.js'));
    });
  }
};
