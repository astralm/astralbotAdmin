module.exports = {
  path: 'intents(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Intents'));
    });
  }
};