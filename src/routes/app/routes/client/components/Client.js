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
import {getClient, setViewSession} from './../../../../../actions/index.js';
import {push} from 'react-router-redux';
class TableSession extends React.Component {
    componentWillMount(){
        if(this.props.client){
            this.props.getClient(this.props.client.client_id);
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
                                        <strong>Телефон: </strong> {this.props.client.client_phone} <br/>
                                        <strong>Сессия: </strong> <span 
                                            onClick={this.session.bind(this)}
                                            style={{
                                                borderBottom: "1px solid #000",
                                                cursor: "pointer"
                                            }}
                                        >{this.props.client.session_id}</span><br/>
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
}), {getClient, setViewSession, push})(TableSession);