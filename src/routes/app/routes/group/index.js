module.exports = {
  path: 'group(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Group'));
    });
  }
};