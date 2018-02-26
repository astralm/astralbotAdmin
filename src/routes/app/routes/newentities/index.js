module.exports = {
  path: 'newentities(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NewEntities'));
    });
  }
};
