module.exports = {
  path: 'dialog(:id)',
  extract: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DialogSimple'));
    });
  }
};
