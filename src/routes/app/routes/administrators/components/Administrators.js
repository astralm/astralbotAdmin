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
class TableUsers extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setUsersFilter",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    JSON.stringify(options)
                ] 
            }
        });
    }
    changePage(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "changePage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    15,
                    0
                ]
            }
        });
    }
    render() {
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card style={{marginBottom: "10px"}}>
                <CardHeader title="Фильтрация" children={<RaisedButton label="Добавить нового" primary onClick={this.changePage.bind(this)}/>} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="В сети" 
                            checked = {
                                this.props.state.usersFilters && 
                                this.props.state.usersFilters.filters && 
                                this.props.state.usersFilters.filters.indexOf("active") > -1
                            }
                            onCheck = {this.setFilter.bind(this, {name: "active"})}
                        />
                        <Checkbox label="Не в сети" 
                            checked = {
                                this.props.state.usersFilters && 
                                this.props.state.usersFilters.filters && 
                                this.props.state.usersFilters.filters.indexOf("inactive") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "inactive"})}
                        />
                        <Checkbox label="Все" 
                            checked = {
                                this.props.state.usersFilters && 
                                this.props.state.usersFilters.filters && 
                                this.props.state.usersFilters.filters.indexOf("all") > -1 &&
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
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "user_name", desc: this.props.state.usersFilters && this.props.state.usersFilters.order != "user_name" && 1 || this.props.state.usersFilters && this.props.state.usersFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ИМЯ</span>
                                    {
                                        this.props.state.usersFilters && this.props.state.usersFilters.order == "user_name" ?
                                            this.props.state.usersFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "user_email", desc: this.props.state.usersFilters && this.props.state.usersFilters.order != "user_email" && 1 || this.props.state.usersFilters && this.props.state.usersFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ПОЧТА</span>
                                    {
                                        this.props.state.usersFilters && this.props.state.usersFilters.order == "user_email" ?
                                            this.props.state.usersFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "user_online", desc: this.props.state.usersFilters && this.props.state.usersFilters.order != "user_online" && 1 || this.props.state.usersFilters && this.props.state.usersFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>СТАТУС</span>
                                    {
                                        this.props.state.usersFilters && this.props.state.usersFilters.order == "user_online" ?
                                            this.props.state.usersFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            this.props.state.users && this.props.state.users.map((user, key) => (
                                <tr key = {key}>
                                    <td className="numeric">{ user.user_name || "—" }</td>
                                    <td className="numeric">{ user.user_email || "—"}</td>
                                    <td className="numeric">{ user.user_online == 1 && "В сети" || user.user_online == 0 && "Не в сети" || "—"}</td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                   (this.props.state.usersFilters && this.props.state.usersFilters.offset) >= (this.props.state.usersFilters && this.props.state.usersFilters.limit) ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.usersFilters && +this.props.state.usersFilters.offset) - (this.props.state.usersFilters && +this.props.state.usersFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {(this.props.state.usersFilters && this.props.state.usersFilters.offset) || 0} по {(this.props.state.usersFilters && +this.props.state.usersFilters.offset) || 0 + (this.props.state.users && +this.props.state.users.length) || 0}</span>
                                {
                                    (this.props.state.users && this.props.state.users.length) < (this.props.state.usersFilters && this.props.state.usersFilters.limit) ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.usersFilters && +this.props.state.usersFilters.offset) + (this.props.state.usersFilters && +this.props.state.usersFilters.limit)})}>
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
}))(TableUsers);