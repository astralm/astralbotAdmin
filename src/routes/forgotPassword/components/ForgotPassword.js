import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';

class ForgotPassowrd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: this.props.state.user ? this.props.state.user.email : ""
    }
  }
  send(){
    this.props.dispatch({
      type: "Query",
      middleware: true,
      data: {
        query: "forgotPassword",
        values: [
          this.props.state.socket.hash,
          this.state.email
        ]
      }
    });
  }
  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">
            <section className="logo text-center">
              <h1><a href="#/">{APPCONFIG.brand}</a></h1>
            </section>
            <form>
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    type="email"
                    value={this.state.email}
                    fullWidth
                    onChange = {(e, value) => {this.setState({email: value})}}
                    errorText = {!/..*@..*.\...*/.test(this.state.email) && "email должен быть формата simple@mail.ru"}
                  />
                  <div className="additional-info text-center text-small">
                    Введите ваш email для оправки сообщения с вашими персональными данными по аккаунту. 
                 </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
          {
            /..*@..*.\...*/.test(this.state.email) &&
            <span className="color-primary" onClick = {this.send.bind(this)} style={{cursor: "pointer", textTransform: "uppercase"}}>Reset</span>
          }
          </div>
        </div>
      </div>
    );
  }
}
const ForgotPasswordRedux = connect(state => ({
  state: state.app.toJS()
}))(ForgotPassowrd);
const Page = () => (
  <div className="page-forgot">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <ForgotPasswordRedux/>
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;

