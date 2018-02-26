module.exports = {
  path: 'newgroup(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NewGroup'));
    });
  }
};
