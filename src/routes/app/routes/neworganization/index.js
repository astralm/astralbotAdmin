module.exports = {
  path: 'neworganization',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NewOrganization'));
    });
  }
};
