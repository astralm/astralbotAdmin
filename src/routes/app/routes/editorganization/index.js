module.exports = {
  path: 'editOrganization',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EditOrganization.js'));
    });
  }
};
