import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {push} from 'react-router-redux';
class TableClients extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setClientsFilter",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    JSON.stringify(options)
                ] 
            }
        });
    }
    goTo(props){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "changePage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    props.page_id,
                    props.item_id || 0
                ]
            }
        });
    }
    render() {
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card style={{marginBottom: "10px"}}>
                <CardHeader title="Фильтрация" actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="В сети" 
                            checked = {
                                this.props.state.clientsFilters && 
                                this.props.state.clientsFilters.filters && 
                                this.props.state.clientsFilters.filters.indexOf("active") > -1
                            }
                            onCheck = {this.setFilter.bind(this, {name: "active"})}
                        />
                        <Checkbox label="Не в сети" 
                            checked = {
                                this.props.state.clientsFilters && 
                                this.props.state.clientsFilters.filters && 
                                this.props.state.clientsFilters.filters.indexOf("inactive") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "inactive"})}
                        />
                        <Checkbox label="Все" 
                            checked = {
                                this.props.state.clientsFilters && 
                                this.props.state.clientsFilters.filters && 
                                this.props.state.clientsFilters.filters.indexOf("all") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "all"})}
                        />
                    </div>
                </CardText>
            </Card>
            <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                <table className="mdl-data-table table-bordered table-striped cf no-margin">
                    <thead className="cf">
                        <tr>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "client_id", desc: this.props.state.clientsFilters && this.props.state.clientsFilters.order != "client_id" && 1 || this.props.state.clientsFilters && this.props.state.clientsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ID</span>
                                    {
                                        this.props.state.clientsFilters && this.props.state.clientsFilters.order == "client_id" ?
                                            this.props.state.clientsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "client_name", desc: this.props.state.clientsFilters && this.props.state.clientsFilters.order != "client_name" && 1 || this.props.state.clientsFilters && this.props.state.clientsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ИМЯ</span>
                                    {
                                        this.props.state.clientsFilters && this.props.state.clientsFilters.order == "client_name" ?
                                            this.props.state.clientsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "client_email", desc: this.props.state.clientsFilters && this.props.state.clientsFilters.order != "client_email" && 1 || this.props.state.clientsFilters && this.props.state.clientsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ПОЧТА</span>
                                    {
                                        this.props.state.clientsFilters && this.props.state.clientsFilters.order == "client_email" ?
                                            this.props.state.clientsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "client_phone", desc: this.props.state.clientsFilters && this.props.state.clientsFilters.order != "client_phone" && 1 || this.props.state.clientsFilters && this.props.state.clientsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ТЕЛЕФОН</span>
                                    {
                                        this.props.state.clientsFilters && this.props.state.clientsFilters.order == "client_phone" ?
                                            this.props.state.clientsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "client_username", desc: this.props.state.clientsFilters && this.props.state.clientsFilters.order != "client_username" && 1 || this.props.state.clientsFilters && this.props.state.clientsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>USERNAME</span>
                                    {
                                        this.props.state.clientsFilters && this.props.state.clientsFilters.order == "client_username" ?
                                            this.props.state.clientsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "dialog_id", desc: this.props.state.clientsFilters && this.props.state.clientsFilters.order != "dialog_id" && 1 || this.props.state.clientsFilters && this.props.state.clientsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ДИАЛОГ</span>
                                    {
                                        this.props.state.clientsFilters && this.props.state.clientsFilters.order == "dialog_id" ?
                                            this.props.state.clientsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>ПОДРОБНЕЕ</span>
                                </div>
                            </th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            this.props.state.clients && this.props.state.clients.map((client, clientKey) => (
                                <tr key = {clientKey}>
                                    <td className="numeric">{ client.client_id }</td>
                                    <td className="numeric">{ client.client_name || "—" }</td>
                                    <td className="numeric">{ client.client_email || "—"}</td>
                                    <td className="numeric">{ client.client_phone || "—"}</td>
                                    <td className="numeric">{ client.client_username || "—"}</td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 9, item_id: client.dialog_id})} style={{color: client.dialog_id != (this.props.state.dialog && this.props.state.dialog.dialog_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer"}}>remove_red_eye</i>
                                    </td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 11, item_id: client.client_id})} style={{color: client.client_id != (this.props.state.client && this.props.state.client.client_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer", width: "24px"}}>persona</i>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                   (this.props.state.clientsFilters && this.props.state.clientsFilters.offset) >= (this.props.state.clientsFilters && this.props.state.clientsFilters.limit) ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.clientsFilters && +this.props.state.clientsFilters.offset) - (this.props.state.clientsFilters && +this.props.state.clientsFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {(this.props.state.clientsFilters && this.props.state.clientsFilters.offset) || 0} по {(this.props.state.clientsFilters && +this.props.state.clientsFilters.offset) || 0 + (this.props.state.clients && +this.props.state.clients.length) || 0}</span>
                                {
                                    (this.props.state.clients && this.props.state.clients.length) < (this.props.state.clientsFilters && this.props.state.clientsFilters.limit) ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.clientsFilters && +this.props.state.clientsFilters.offset) + (this.props.state.clientsFilters && +this.props.state.clientsFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </IconButton>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Paper>
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(TableClients);