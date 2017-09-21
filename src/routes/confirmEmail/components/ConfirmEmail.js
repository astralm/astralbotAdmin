import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
class ConfirmEmail extends React.Component {
  render(){
    return <div className="body-inner">
      <div className="card bg-color-white">
        <div className="card-content">
          <div className="logo text-center">
            <a ></a>
          </div>

          <div>
            <p className="confirm-mail-icon"><span className="material-icons">mail_outline</span></p>
            <p className="text-center text-small no-margin" style={{color: this.props.mail ? "inherit" : "red"}}>
              {
                this.props.mail ? 
                  "Сообщение было отправлено" : 
                  "Пользователь с таким email не зарегестрирован"
              }
            </p>
          </div>

        </div>
      </div>
      <div className="additional-info">
        <span>Вернуться на страницу <a href="#/login">Авторизации</a></span>
      </div>
    </div>
  }
}

var ConfirmEmailRedux = connect(state => ({
  mail: state.app.get('mail')
}))(ConfirmEmail);

const Page = () => (
  <div className="page-auth page-confirm-email">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <ConfirmEmailRedux />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;

