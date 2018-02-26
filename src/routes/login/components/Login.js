import React from 'react';
import APPCONFIG from 'constants/Config';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
  componentWillMount(){
    if(localStorage.getItem("user") && localStorage.getItem("socket") && !this.props.state.user){
      this.props.dispatch({
        type: "Query",
        middleware: true,
        data: {
          query: "loginWithHash",
          values: [
            localStorage.getItem("user"),
            localStorage.getItem("socket"),
            localStorage.getItem("page_id"),
            localStorage.getItem("item_id")
          ]
        }
      });
    }
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
    this.props.dispatch({
      type: "Query",
      middleware: true,
      data: {
        query: "login",
        values: [
          this.state.email,
          this.state.password,
          this.props.state.socket.hash
        ]
      }
    });
  }
  goTo(){
    this.props.dispatch(push("/forgot-password"));
  }
  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center" style={{color: "#ca5555", fontSize: "15px"}}>
              <h1><a href="#/">{this.state.brand}</a></h1>
              {this.props.state.loginMessage || ""}
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
                    floatingLabelText="Пароль"
                    type="password"
                    fullWidth
                    onInput = {this.inputPassword}
                    />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <FlatButton onClick = {this.click} label="Войти" labelStyle={{color: "#2196F3"}}/>
          </div>
        </div>
        <div className="additional-info">
          <span style = {{color: "#fafafa", borderBottom: "1px solid #fafafa", cursor: "pointer"}} onClick={this.goTo.bind(this)}>Восстановить пароль</span>
        </div>
      </div>
    );
  }
}


const LoginContainer = connect(state => ({
  state: state.app.toJS()
}))(Login);

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
