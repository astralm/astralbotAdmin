module.exports = {
  path: 'clients',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Clients'));
    });
  }
};