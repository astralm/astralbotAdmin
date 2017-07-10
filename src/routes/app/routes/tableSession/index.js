module.exports = {
  path: 'tableSession',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/tableSession'));
    });
  }
};
