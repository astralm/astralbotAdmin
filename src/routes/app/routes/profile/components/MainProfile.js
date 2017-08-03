import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
class MainProfile extends React.Component {
    render() {
        this.state = {
            user: this.props.user
        };
        return (
            <div>
                <article className="article article-dark">
                    <div className="container-fluid with-maxwidth">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="box box-transparent">
                                    <div className="box-body padding-lg-h">
                                        <h4>Ваш профиль</h4>
                                        <p>
                                            <strong>Email:</strong> {this.state.user.email}
                                            <br />
                                            <strong>Name:</strong> {this.state.user.name}
                                        </p>
                                        <RaisedButton label="Редактировать" href='#/app/edituser'  secondary />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}
module.exports = connect(state => ({
    user: state.app.get('user').toJS()
}))(MainProfile);

