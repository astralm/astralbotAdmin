import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {push} from 'react-router-redux';
class Client extends React.Component {
    goToDialog(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "changePage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    9,
                    this.props.state.client.dialog_id
                ]
            }
        })
    }
    goToEditClient(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "changePage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    19,
                    this.props.state.client.client_id
                ]
            }
        })
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
                                        <strong>ID: </strong> {this.props.state.client && this.props.state.client.client_id || "—"} <br/>
                                        <strong>Имя: </strong> {this.props.state.client && this.props.state.client.client_name || "—"} <br/>
                                        <strong>Email: </strong> {this.props.state.client && this.props.state.client.client_email || "—"} <br/>
                                        <strong>Username: </strong> {this.props.state.client && this.props.state.client.client_username || "—"} <br/>
                                        <strong>Телефон: </strong> {this.props.state.client && this.props.state.client.client_phone || "—"} <br/>
                                        <strong>Диалог: </strong> <span 
                                            onClick={this.goToDialog.bind(this)}
                                            style={{
                                                borderBottom: "1px solid #000",
                                                cursor: "pointer"
                                            }}
                                        >{this.props.state.client && this.props.state.client.dialog_id || "—"}</span><br/>
                                        <strong>URL: {this.props.state.client && this.props.state.client.socket_url || "—"}</strong><br/>
                                        <strong>IP: {this.props.state.client && this.props.state.client.socket_ip || "—"}</strong><br/>
                                        <strong>Браузер: {(this.props.state.client && this.props.state.client.socket_browser_name || "—") + " " + (this.props.state.client && this.props.state.client.socket_browser_version || "")}</strong><br/>
                                        <strong>Движок браузера: {(this.props.state.client && this.props.state.client.socket_engine_name || "—") + " " + (this.props.state.client && this.props.state.client.socket_engine_version || "")}</strong><br/>
                                        <strong>Операционная система: {(this.props.state.client && this.props.state.client.socket_os_name || "—") + " " + (this.props.state.client && this.props.state.client.socket_os_version || "")}</strong><br/>
                                        <strong>Устройство: {
                                            (this.props.state.client && this.props.state.client.socket_device_vendor || "—") + " " + (this.props.state.client && this.props.state.client.socket_device_model || "")
                                        }</strong><br/>
                                        <strong>Тип устройства: {this.props.state.client && this.props.state.client.socket_device_type || "—"}</strong><br/>
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.goToEditClient.bind(this)}  secondary />
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
    state: state.app.toJS()
}))(Client);