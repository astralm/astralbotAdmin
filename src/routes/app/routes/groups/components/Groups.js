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
class TableGroups extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setGroupsFilter",
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
                <CardHeader title="Фильтрация" actAsExpander={true} showExpandableButton={true} children={<RaisedButton primary onClick={this.goTo.bind(this, {page_id: 31, item_id: this.props.state.bot && this.props.state.bot.bot_id})} label="Добавить новую" />}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Интенты" 
                            checked = {
                                this.props.state.groupsFilters && 
                                this.props.state.groupsFilters.filters && 
                                this.props.state.groupsFilters.filters.indexOf("intents") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "intents"})}
                        />
                        <Checkbox label="Синонимы" 
                            checked = {
                                this.props.state.groupsFilters && 
                                this.props.state.groupsFilters.filters && 
                                this.props.state.groupsFilters.filters.indexOf("entities") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "entities"})}
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Все" 
                            checked = {
                                this.props.state.groupsFilters && 
                                this.props.state.groupsFilters.filters && 
                                this.props.state.groupsFilters.filters.indexOf("all") > -1 &&
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
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "group_id", desc: this.props.state.groupsFilters && this.props.state.groupsFilters.order != "group_id" && 1 || this.props.state.groupsFilters && this.props.state.groupsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ID</span>
                                    {
                                        this.props.state.groupsFilters && this.props.state.groupsFilters.order == "group_id" ?
                                            this.props.state.groupsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "group_name", desc: this.props.state.groupsFilters && this.props.state.groupsFilters.order != "group_name" && 1 || this.props.state.groupsFilters && this.props.state.groupsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>НАЗВАНИЕ</span>
                                    {
                                        this.props.state.groupsFilters && this.props.state.groupsFilters.order == "group_name" ?
                                            this.props.state.groupsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "type_id", desc: this.props.state.groupsFilters && this.props.state.groupsFilters.order != "type_id" && 1 || this.props.state.groupsFilters && this.props.state.groupsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ТИП ГРУППЫ</span>
                                    {
                                        this.props.state.groupsFilters && this.props.state.groupsFilters.order == "type_id" ?
                                            this.props.state.groupsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "group_items_count", desc: this.props.state.groupsFilters && this.props.state.groupsFilters.order != "group_items_count" && 1 || this.props.state.groupsFilters && this.props.state.groupsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>КОЛИЧЕСТВО ЭЛЕМЕНТОВ В ГРУППЕ</span>
                                    {
                                        this.props.state.groupsFilters && this.props.state.groupsFilters.order == "group_items_count" ?
                                            this.props.state.groupsFilters.desc ?
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
                            this.props.state.groups && this.props.state.groups.map((group, groupKey) => (
                                <tr key = {groupKey}>
                                    <td className="numeric">{ group.group_id }</td>
                                    <td className="numeric">{ group.group_name || "—" }</td>
                                    <td className="numeric">{ group.type_id == 6 && "Интенты" || group.type_id == 7 && "Синонимы" || "—" }</td>
                                    <td className="numeric">{ group.group_items_count || "—"}</td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 32, item_id: group.group_id})} style={{color: group.group_id != (this.props.state.group && this.props.state.group.group_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer", width: "24px"}}>settings</i>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                   (this.props.state.groupsFilters && this.props.state.groupsFilters.offset) >= (this.props.state.groupsFilters && this.props.state.groupsFilters.limit) ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.groupsFilters && +this.props.state.groupsFilters.offset) - (this.props.state.groupsFilters && +this.props.state.groupsFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {(this.props.state.groupsFilters && this.props.state.groupsFilters.offset) || 0} по {(this.props.state.groupsFilters && +this.props.state.groupsFilters.offset) || 0 + (this.props.state.groups && +this.props.state.groups.length) || 0}</span>
                                {
                                    (this.props.state.groups && this.props.state.groups.length) < (this.props.state.groupsFilters && this.props.state.groupsFilters.limit) ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.groupsFilters && +this.props.state.groupsFilters.offset) + (this.props.state.groupsFilters && +this.props.state.groupsFilters.limit)})}>
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
}))(TableGroups);