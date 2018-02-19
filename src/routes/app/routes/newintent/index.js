module.exports = {
  path: 'newintent(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NewIntent'));
    });
  }
};
