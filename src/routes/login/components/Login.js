import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { login } from '../../../actions/index.js';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: APPCONFIG.brand,
      email: props.email || "",
      password: props.password || ""
    };
    this.inputEmail = this.inputEmail.bind(this);
    this.inputPassword = this.inputPassword.bind(this);
    this.click = this.click.bind(this);
    if(window.location.hash != "#/login")
      window.location.hash = "#/login";
  }
  inputEmail(event){
    this.setState({
      email: event.target.value
    });
  }
  inputPassword(event){
    this.setState({
      password: event.target.value
    });
  }
  click(event){
    this.props.login(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <h1><a href="#/">{this.state.brand}</a></h1>
            </section>

            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    fullWidth
                    onInput = {this.inputEmail}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    fullWidth
                    onInput = {this.inputPassword}
                    />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/" className="color-primary" onClick = {this.click}>Login</a>
          </div>
        </div>

        <div className="additional-info">
          <a href="#/forgot-password">Forgot your password?</a>
        </div>

      </div>
    );
  }
}

const LoginContainer = connect(null, {login})(Login);

const Page = () => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <LoginContainer />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
