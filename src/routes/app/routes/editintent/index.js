module.exports = {
  path: 'editintent(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EditIntent'));
    });
  }
};
