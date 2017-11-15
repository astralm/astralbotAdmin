import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {setViewOrganization, getUser} from './../../../../../actions/index.js';
class MainProfile extends React.Component {
    componentWillMount(){
        this.props.getUser(this.props.user.user_email);
    }
    organizationLink(){
        this.props.setViewOrganization(this.props.organization.organization_id);
        this.props.push('app/organization');
    }
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
                                            <strong>Почта:</strong> {this.state.user.email}
                                            <br />
                                            <strong>Имя:</strong> {this.state.user.name}
                                            <br />
                                            <strong>Организация:</strong> {
                                                this.props.organization.organization_root ?
                                                    <span onClick={this.organizationLink.bind(this)} style={{borderBottom: "1px dashed #000", cursor: "pointer"}}>{this.props.organization.organization_name}</span>
                                                    : this.props.organization.organization_name
                                            }
                                            <br />
                                            <strong>Сайт организации:</strong> <a href={this.props.organization.organization_site} target="_blank">{this.props.organization.organization_site}</a><br/>
                                            <strong>Ключ для подписки на оповещения в telegram:</strong> {this.state.user.user_notification_hash}<br />
                                            <strong>Оповещения в телеграм:</strong> {this.state.user.user_notification ? "Включены" : "Выключены"}
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
    user: state.app.get('user').toJS(),
    organization: state.app.get('userOrganization').toJS()
}), {push, setViewOrganization, getUser})(MainProfile);

