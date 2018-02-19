module.exports = {
  path: 'editgroup(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EditGroup'));
    });
  }
};
