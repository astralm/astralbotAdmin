module.exports = {
  path: 'bot(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Bot'));
    });
  }
};
