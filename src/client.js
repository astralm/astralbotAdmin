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
import { updateState, login, logout, initNotification } from './actions';
import io from 'socket.io-client';
import ENV from './constants/env.js';

const socket = io(`${ENV.ws.location}:${ENV.ws.port}`);
const middleware = routerMiddleware(hashHistory);
const store = createStore(
  reducers,
  applyMiddleware(middleware, appMiddleware(socket))
);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState().app.toJS()));
});

if(localStorage.state){
  store.dispatch(updateState(localStorage.state));
}

initMiddlewareEvents(socket, store);

const history = syncHistoryWithStore(hashHistory, store);

function scrollToTop() {
  window.scrollTo(0, 0);
}
{
  let state = store.getState().app;
  let user = state.get('user') ? state.get('user').toJS() : false;
  if(user)
    if(user.email && user.password)
      store.dispatch(login(user.email, user.password));
}
store.dispatch(initNotification());
const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./containers/App'),
    indexRoute: { onEnter: (nextState, replace) => replace('/app') },
    childRoutes: [
      require('./routes/app'),
      require('./routes/404'),
      require('./routes/confirmEmail'),
      require('./routes/forgotPassword'),
      require('./routes/login'),
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
