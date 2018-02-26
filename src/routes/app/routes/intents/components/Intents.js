import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {push} from 'react-router-redux';
class TableIntents extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setIntentsFilter",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    JSON.stringify(options),
                    parseInt(this.props.params.id.replace(":", ""))
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
                <CardHeader title="Фильтрация" actAsExpander={true} showExpandableButton={true} children={<RaisedButton primary onClick={this.goTo.bind(this, {page_id: 27, item_id: this.props.state.bot && this.props.state.bot.bot_id})} label="Добавить новый" />}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "20%", height: "100px", overflowY: "auto", verticalAlign: "top"}}>
                        {
                            this.props.state.intentsGroups && this.props.state.intentsGroups.map((group,key) => (
                                <Checkbox label={group.group_name}
                                    style={{display: "inline-block"}}
                                    key = {key}
                                    checked = {this.props.state.intentsFilters.groups && this.props.state.intentsFilters.groups.indexOf(group.group_id) != -1 && this.props.state.intentsFilters.filters.indexOf("group") != -1}
                                    onCheck = { 
                                        ((group_id)=>{
                                            let groups = this.props.state.intentsFilters.groups || [],
                                                responce = {};
                                            groups.indexOf(group_id) == -1 ? groups.push(group_id) : groups.splice(groups.indexOf(group_id), 1);
                                            groups.length == 0 && this.props.state.intentsFilters.filters.indexOf("group") > -1 ?
                                                (responce.name = "group") :
                                                this.props.state.intentsFilters.filters.indexOf("group") == -1 && groups.length > 0 && (responce.name = "group");
                                            responce.groups = groups;
                                            this.setFilter.call(this, responce);
                                        }).bind(this, group.group_id)
                                    }
                                />
                            ))
                        }
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Без группы" 
                            checked = {
                                this.props.state.intentsFilters && 
                                this.props.state.intentsFilters.filters && 
                                this.props.state.intentsFilters.filters.indexOf("nogroup") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "nogroup"})}
                        />
                        <Checkbox label="Все" 
                            checked = {
                                this.props.state.intentsFilters && 
                                this.props.state.intentsFilters.filters && 
                                this.props.state.intentsFilters.filters.indexOf("all") > -1 &&
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
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "intent_id", desc: this.props.state.intentsFilters && this.props.state.intentsFilters.order != "intent_id" && 1 || this.props.state.intentsFilters && this.props.state.intentsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ID</span>
                                    {
                                        this.props.state.intentsFilters && this.props.state.intentsFilters.order == "intent_id" ?
                                            this.props.state.intentsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "intent_name", desc: this.props.state.intentsFilters && this.props.state.intentsFilters.order != "intent_name" && 1 || this.props.state.intentsFilters && this.props.state.intentsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ИМЯ</span>
                                    {
                                        this.props.state.intentsFilters && this.props.state.intentsFilters.order == "intent_name" ?
                                            this.props.state.intentsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "intent_conditions_count", desc: this.props.state.intentsFilters && this.props.state.intentsFilters.order != "intent_conditions_count" && 1 || this.props.state.intentsFilters && this.props.state.intentsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>КОЛИЧЕСТВО УСЛОВИЙ</span>
                                    {
                                        this.props.state.intentsFilters && this.props.state.intentsFilters.order == "intent_conditions_count" ?
                                            this.props.state.intentsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "group_id", desc: this.props.state.intentsFilters && this.props.state.intentsFilters.order != "group_id" && 1 || this.props.state.intentsFilters && this.props.state.intentsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ГРУППА</span>
                                    {
                                        this.props.state.intentsFilters && this.props.state.intentsFilters.order == "group_id" ?
                                            this.props.state.intentsFilters.desc ?
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
                            this.props.state.intents && this.props.state.intents.map((intent, intentKey) => (
                                <tr key = {intentKey}>
                                    <td className="numeric">{ intent.intent_id }</td>
                                    <td className="numeric">{ intent.intent_name || "—" }</td>
                                    <td className="numeric">{ intent.intent_conditions_count || "—"}</td>
                                    <td className="numeric">{ intent.group_id && this.props.state.intentsGroups && this.props.state.intentsGroups.find(group => group.group_id == intent.group_id).group_name || "—"}</td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 28, item_id: intent.intent_id})} style={{color: intent.intent_id != (this.props.state.intent && this.props.state.intent.intent_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer", width: "24px"}}>settings</i>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                   (this.props.state.intentsFilters && this.props.state.intentsFilters.offset) >= (this.props.state.intentsFilters && this.props.state.intentsFilters.limit) ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.intentsFilters && +this.props.state.intentsFilters.offset) - (this.props.state.intentsFilters && +this.props.state.intentsFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {(this.props.state.intentsFilters && this.props.state.intentsFilters.offset) || 0} по {(this.props.state.intentsFilters && +this.props.state.intentsFilters.offset) || 0 + (this.props.state.intents && +this.props.state.intents.length) || 0}</span>
                                {
                                    (this.props.state.intents && this.props.state.intents.length) < (this.props.state.intentsFilters && this.props.state.intentsFilters.limit) ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.intentsFilters && +this.props.state.intentsFilters.offset) + (this.props.state.intentsFilters && +this.props.state.intentsFilters.limit)})}>
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
}))(TableIntents);