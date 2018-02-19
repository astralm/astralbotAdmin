module.exports = {
  path: 'intent(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Intent'));
    });
  }
};