module.exports = {
  path: '/app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/dialog'),
        require('./routes/tableSession'),
        require('./routes/administrators'),
        require('./routes/newuser'),
        require('./routes/edituser'),
        require('./routes/profile'),
        require('./routes/dispatch/'),
        require('./routes/clients/'),
        require('./routes/client/'),
        require('./routes/editclient/'),
        require('./routes/organizations/'),
        require('./routes/organization/'),
        require('./routes/editorganization/'),
        require('./routes/neworganization/'),
        require('./routes/widget/'),
        require('./routes/bots/'),
        require('./routes/bot/'),
        require('./routes/editbot/'),
        require('./routes/newbot/'),
        require('./routes/intents/'),
        require('./routes/newintent/'),
        require('./routes/intent'),
        require('./routes/editintent'),
        require('./routes/groups'),
        require("./routes/newgroup"),
        require("./routes/group"),
        require("./routes/editgroup"),
        require("./routes/entities"),
        require("./routes/newentities"),
        require("./routes/entity"),
        require("./routes/editentities/")
      ]);
    });
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  },
    indexRoute: { onEnter: (nextState, replace) => replace('/app/tableSession') }

};
