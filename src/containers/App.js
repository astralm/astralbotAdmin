import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from '../routes/login/components/Login.js';
import {push} from 'react-router-redux';
// = styles =
// 3rd
import 'styles/bootstrap.scss';
// custom
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import grayTheme from './themes/grayTheme';


injectTapEventPlugin(); // Needed for onTouchTap for Material UI


class App extends Component {
  componentWillMount(){
    let path = this.props.children.props.location.pathname,
        page = path.match(/\/app\/([aA-zZ]*)/) ? path.match(/\/app\/([aA-zZ]*)/)[1] : path.match(/\/([aA-zZ]*)/) ? path.match(/\/([aA-zZ]*)/)[1] : "",
        item = path.match(/\/app\/.*:([0-9]*)/) ? path.match(/\/app\/.*:([0-9]*)/)[1] : 0;
    switch (page) {
      case "tableSession":
        page = 8;
      break;
      case "dialog":
        page = 9;
      break;
      case "clients":
        page = 10;
      break;
      case "client":
        page = 11;
      break;
      case "editclient":
        page = 19;
      break;
      case "organizations":
        page = 17;
      break;
      case "neworganization":
        page = 18;
      break;
      case "administrators":
        page = 12;
      break;
      case "newuser":
        page = 15;
      break;
      case "profile":
        page = 13;
      break;
      case "dispatch":
        page = 16;
      break;
      case "organization":
        page = 20;
      break;
      case "editorganization":
        page = 21;
      break;
      case "widgets":
        page = 22;
      break;
      case "bots":
        page = 23;
      break;
      case "bot":
        page = 24;
      break;
      case "editbot":
        page = 25;
      break;
      case "newbot":
        page = 26;
      break;
      case "intents":
        page = 6;
      break;
      case "newintent":
        page = 27;
      break;
      case "intent":
        page = 28;
      break;
      case "editintent":
        page = 29;
      break;
      case "groups":
        page = 30;
      break;
      case "newgroup":
        page = 31;
      break;
      case "group":
        page = 32;
      break;
      case "editgroup":
        page = 33;
      break;
      case "entities":
        page = 7;
      break;
      case "newentities":
        page = 34;
      break;
      case "entity":
        page = 35;
      break;
      case "editentities":
        page = 36;
      break;
      default:
        page = 8;
    }
    localStorage.setItem("page_id", page);
    localStorage.setItem("item_id", item || 0);
  }
  render() {
    const { layoutBoxed, navCollapsed, navBehind, fixedHeader, sidebarWidth, theme } = this.props;
    let materialUITheme;
    switch (theme) {
      case 'gray':
        materialUITheme = grayTheme;
        break;
      case 'dark':
        materialUITheme = darkTheme;
        break;
      default:
        materialUITheme = lightTheme;
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(materialUITheme)}>
        <div id="app-inner">
          <div className="preloaderbar hide"><span className="bar" /></div>
          <div
            className={classnames('full-height', {
              'fixed-header': fixedHeader,
              'nav-collapsed': navCollapsed,
              'nav-behind': navBehind,
              'layout-boxed': layoutBoxed,
              'theme-gray': theme === 'gray',
              'theme-dark': theme === 'dark',
              'sidebar-sm': sidebarWidth === 'small',
              'sidebar-lg': sidebarWidth === 'large'})
                    }>
            {
              ["/forgot-password","/confirm-email","/404","/500","/login"].indexOf(this.props.children.props.location.pathname) > -1 &&
              this.props.children ||
              (this.props.state &&
              this.props.state.user &&
              this.props.state.user.auth == 1) &&
              this.props.children ||
              <Login/>
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  layoutBoxed: state.settings.layoutBoxed,
  navCollapsed: state.settings.navCollapsed,
  navBehind: state.settings.navBehind,
  fixedHeader: state.settings.fixedHeader,
  sidebarWidth: state.settings.sidebarWidth,
  theme: state.settings.theme,
  state: state.app.toJS()
});

module.exports = connect(
  mapStateToProps
)(App);
