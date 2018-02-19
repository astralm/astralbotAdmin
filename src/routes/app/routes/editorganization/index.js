module.exports = {
  path: 'editorganization(:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EditOrganization.js'));
    });
  }
};
