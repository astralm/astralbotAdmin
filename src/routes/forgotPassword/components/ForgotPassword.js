import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import {sendEmail} from './../../../actions/index.js';

class ForgotPassowrd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      error: ""
    }
  }
  change(obj, value){
    this.setState({email: value});
  }
  send(){
    if(/.*@[aA-zZ]*\.[aA-zZ]*/.test(this.state.email)){
      this.setState({error: ""});
      this.props.sendEmail(this.state.email);
    } else {
      this.setState({error: "Неправильный формат email"});
    }
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
                    fullWidth
                    onChange = {this.change.bind(this)}
                    errorText = {this.state.error}
                  />
                  <div className="additional-info text-center text-small">
                    Введите ваш email для оправки сообщения с вашими персональными данными по аккаунту. 
                 </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <span className="color-primary" onClick = {this.send.bind(this)} style={{cursor: "pointer", textTransform: "uppercase"}}>Reset</span>
          </div>
        </div>
      </div>
    );
  }
}
const ForgotPasswordRedux = connect(state => ({
  validate: state.app.get('validate')
}), {sendEmail})(ForgotPassowrd);
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

