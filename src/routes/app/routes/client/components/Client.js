import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import {} from '../../../../../actions/index.js';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {getClient, setViewSession, setViewClient} from './../../../../../actions/index.js';
import {push} from 'react-router-redux';
class TableSession extends React.Component {
    componentWillMount(){
        if(this.props.client || this.props.params.id){
            let client_id = this.props.client.client_id;
            if(this.props.params.id){
                if(/\:([0-9]*)/.test(this.props.params.id)){
                    client_id = this.props.params.id.match(/\:([0-9]*)/)[1];
                    this.props.setViewClient(client_id);
                }
            }
            this.props.getClient(client_id);
        }
    }
    session(){
        this.props.setViewSession(this.props.client.session_id);
        this.props.push("/app/dialog");
    }
    edit(){
        this.props.push("/app/editClient");
    }
    render() {
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Клиент</h4>
                                    <p>
                                        <strong>ID: </strong> {this.props.client.client_id} <br/>
                                        <strong>Имя: </strong> {this.props.client.client_name} <br/>
                                        <strong>Email: </strong> {this.props.client.client_email} <br/>
                                        <strong>Username: </strong> {this.props.client.client_username} <br/>
                                        <strong>Телефон: </strong> {this.props.client.client_phone} <br/>
                                        <strong>Сессия: </strong> <span 
                                            onClick={this.session.bind(this)}
                                            style={{
                                                borderBottom: "1px solid #000",
                                                cursor: "pointer"
                                            }}
                                        >{this.props.client.session_id}</span><br/>
                                        <strong>URL: {this.props.client.client_url}</strong><br/>
                                        <strong>IP: {this.props.client.client_ip}</strong><br/>
                                        <strong>Браузер: {this.props.client.client_browser_name + " " + this.props.client.client_browser_version}</strong><br/>
                                        <strong>Движок браузера: {this.props.client.client_engine_name + " " + this.props.client.client_engine_version}</strong><br/>
                                        <strong>Операционная система: {this.props.client.client_os_name + " " + this.props.client.client_os_version}</strong><br/>
                                        <strong>Устройство: {
                                            this.props.client.client_device_vendor && this.props.client.client_device_model ?
                                                (this.props.client.client_device_vendor + " " + this.props.client.client_device_model) :
                                                "Не определено"
                                        }</strong><br/>
                                        <strong>Тип устройства: {this.props.client.client_device_type || "Не определено"}</strong><br/>
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.edit.bind(this)}  secondary />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    }
}
module.exports = connect(state => ({
    client: state.app.get("client") ?
        state.app.get("client").toJS() :
        false
}), {getClient, setViewSession, push, setViewClient})(TableSession);