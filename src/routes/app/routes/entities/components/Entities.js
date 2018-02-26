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
class TableEntities extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setEntitiesFilter",
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
                <CardHeader title="Фильтрация" actAsExpander={true} showExpandableButton={true} children={<RaisedButton primary onClick={this.goTo.bind(this, {page_id: 34, item_id: this.props.state.bot && this.props.state.bot.bot_id})} label="Добавить новый" />}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "20%", height: "100px", overflowY: "auto", verticalAlign: "top"}}>
                        {
                            this.props.state.entitiesGroups && this.props.state.entitiesGroups.map((group,key) => (
                                <Checkbox label={group.group_name}
                                    style={{display: "inline-block"}}
                                    key = {key}
                                    checked = {this.props.state.entitiesFilters.groups && this.props.state.entitiesFilters.groups.indexOf(group.group_id) != -1 && this.props.state.entitiesFilters.filters.indexOf("group") != -1}
                                    onCheck = { 
                                        ((group_id)=>{
                                            let groups = this.props.state.entitiesFilters.groups || [],
                                                responce = {};
                                            groups.indexOf(group_id) == -1 ? groups.push(group_id) : groups.splice(groups.indexOf(group_id), 1);
                                            groups.length == 0 && this.props.state.entitiesFilters.filters.indexOf("group") > -1 ?
                                                (responce.name = "group") :
                                                this.props.state.entitiesFilters.filters.indexOf("group") == -1 && groups.length > 0 && (responce.name = "group");
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
                                this.props.state.entitiesFilters && 
                                this.props.state.entitiesFilters.filters && 
                                this.props.state.entitiesFilters.filters.indexOf("nogroup") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "nogroup"})}
                        />
                        <Checkbox label="Все" 
                            checked = {
                                this.props.state.entitiesFilters && 
                                this.props.state.entitiesFilters.filters && 
                                this.props.state.entitiesFilters.filters.indexOf("all") > -1 &&
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
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "entities_id", desc: this.props.state.entitiesFilters && this.props.state.entitiesFilters.order != "entities_id" && 1 || this.props.state.entitiesFilters && this.props.state.entitiesFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ID</span>
                                    {
                                        this.props.state.entitiesFilters && this.props.state.entitiesFilters.order == "entities_id" ?
                                            this.props.state.entitiesFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "entities_name", desc: this.props.state.entitiesFilters && this.props.state.entitiesFilters.order != "entities_name" && 1 || this.props.state.entitiesFilters && this.props.state.entitiesFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>НАЗВАНИЕ</span>
                                    {
                                        this.props.state.entitiesFilters && this.props.state.entitiesFilters.order == "entities_name" ?
                                            this.props.state.entitiesFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "group_id", desc: this.props.state.entitiesFilters && this.props.state.entitiesFilters.order != "group_id" && 1 || this.props.state.entitiesFilters && this.props.state.entitiesFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ГРУППА</span>
                                    {
                                        this.props.state.entitiesFilters && this.props.state.entitiesFilters.order == "group_id" ?
                                            this.props.state.entitiesFilters.desc ?
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
                            this.props.state.entities && this.props.state.entities.map((entity, entityKey) => (
                                <tr key = {entityKey}>
                                    <td className="numeric">{ entity.entities_id || "—" }</td>
                                    <td className="numeric">{ entity.entities_name || "—" }</td>
                                    <td className="numeric">{ entity.group_id && this.props.state.entitiesGroups && this.props.state.entitiesGroups.find(group => group.group_id == entity.group_id).group_name || "—" }</td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 35, item_id: entity.entities_id})} style={{color: entity.entities_id != (this.props.state.entity && this.props.state.entity.entities_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer", width: "24px"}}>settings</i>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                   (this.props.state.entitiesFilters && this.props.state.entitiesFilters.offset) >= (this.props.state.entitiesFilters && this.props.state.entitiesFilters.limit) ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.entitiesFilters && +this.props.state.entitiesFilters.offset) - (this.props.state.entitiesFilters && +this.props.state.entitiesFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {(this.props.state.entitiesFilters && this.props.state.entitiesFilters.offset) || 0} по {(this.props.state.entitiesFilters && +this.props.state.entitiesFilters.offset) || 0 + (this.props.state.entities && +this.props.state.entities.length) || 0}</span>
                                {
                                    (this.props.state.entities && this.props.state.entities.length) < (this.props.state.entitiesFilters && this.props.state.entitiesFilters.limit) ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.entitiesFilters && +this.props.state.entitiesFilters.offset) + (this.props.state.entitiesFilters && +this.props.state.entitiesFilters.limit)})}>
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
}))(TableEntities);