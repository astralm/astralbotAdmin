module.exports = {
  path: 'editentities(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EditEntities'));
    });
  }
};
