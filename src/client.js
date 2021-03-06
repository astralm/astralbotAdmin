import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import { fromJS, Map } from 'immutable';
import appMiddleware from './middleware.js';
import initMiddlewareEvents from './middleware_events/index.js';
import io from 'socket.io-client';
import ENV from './constants/env.js';

const socket = io(`${ENV.ws.location}:${ENV.ws.port}`, {
  query: {
    type: "admin"
  }
});
const middleware = routerMiddleware(hashHistory);
const store = createStore(
  reducers,
  applyMiddleware(middleware, appMiddleware(socket))
);
const notification = Notification || window.Notification;
notification.requestPermission(state => {});

initMiddlewareEvents(socket, store);

const history = syncHistoryWithStore(hashHistory, store);

function scrollToTop() {
  window.scrollTo(0, 0);
}

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./containers/App'),
    indexRoute: { onEnter: (nextState, replace) => replace('/app') },
    childRoutes: [
      require('./routes/app'),
      require('./routes/404'),
      require('./routes/login'),
      require('./routes/forgotPassword'),
      require('./routes/confirmEmail'),
      {
        path: '*',
        indexRoute: { onEnter: (nextState, replace) => replace('/404') },
      }
    ]
  }]
};

render(
  <Provider store={store}>
    <Router
      onUpdate={scrollToTop}
      history={history}
      routes={rootRoute}
        />
  </Provider>,
  document.getElementById('app-container')
);
