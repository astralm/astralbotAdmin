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
import {getClients, setViewSession, setViewClient} from './../../../../../actions/index.js';
import {push} from 'react-router-redux';
class TableSession extends React.Component {
    componentWillMount(){
        this.props.getClients();
    }
    session(session_id){
        this.props.setViewSession(session_id);
        this.props.push("/app/dialog");
    }
    client(client_id){
        this.props.setViewClient(client_id);
        this.props.push("/app/client");
    }
    render() {
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                <table className="mdl-data-table table-bordered table-striped cf no-margin">
                    <thead className="cf">
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                ИМЯ
                            </th>
                            <th>    
                                ПОЧТА
                            </th>
                            <th>
                                ТЕЛЕФОН
                            </th>
                            <th>
                                USERNAME
                            </th>
                            <th>
                                СЕССИЯ
                            </th>
                            <th>
                                ПОДРОБНЕЕ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.clients.map((client, key) => (
                                <tr key={key}>
                                    <td>{client.client_id}</td>
                                    <td>{client.client_name}</td>
                                    <td>{client.client_email}</td>
                                    <td>{client.client_phone}</td>
                                    <td>{client.client_username}</td>
                                    <td>
                                        <i className="material-icons" 
                                            style={{
                                                color: client.session_id != this.props.session_id ? 
                                                    "#9E9E9E" : 
                                                    "#4CAF50", 
                                                cursor: "pointer"
                                            }}
                                            onClick={this.session.bind(this, client.session_id)}
                                        >remove_red_eye</i>
                                    </td>
                                    <td>
                                        <i className="material-icons" 
                                            style={{
                                                color: client.client_id != this.props.client_id ? 
                                                    "#9E9E9E" : 
                                                    "#4CAF50", 
                                                cursor: "pointer"
                                            }}
                                            onClick={this.client.bind(this, client.client_id)}
                                        >person</i>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Paper>
    }
}
module.exports = connect(state => ({
    clients : state.app.get("clients") ?
        state.app.get("clients").toJS() :
        [],
    session_id: state.app.getIn(['session','session_id']),
    client_id: state.app.getIn(['client', 'client_id'])
}), {getClients, setViewSession, setViewClient, push})(TableSession);