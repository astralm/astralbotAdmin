module.exports = {
  path: 'editbot(:id)',
  extract: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Editbot'));
    });
  }
};
