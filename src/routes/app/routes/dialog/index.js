module.exports = {
  path: 'dialog',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DialogSimple'));
    });
  }
};
