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
class Tablebots extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setBotsFilter",
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
            <RaisedButton label = "Добавить нового" style = {{margin: "20px 0"}} secondary onClick = {this.goTo.bind(this, {page_id: 26})}/>
            <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                <table className="mdl-data-table table-bordered table-striped cf no-margin">
                    <thead className="cf">
                        <tr> 
                    		<th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "bot_date_update", desc: this.props.state.botsFilters && this.props.state.botsFilters.order != "bot_date_update" && 1 || this.props.state.botsFilters && this.props.state.botsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ДАТА ПОСЛЕДНЕГО ОБНОВЛЕНИЯ</span>
                                    {
                                        this.props.state.botsFilters && this.props.state.botsFilters.order == "bot_date_update" ?
                                            this.props.state.botsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "bot_name", desc: this.props.state.botsFilters && this.props.state.botsFilters.order != "bot_name" && 1 || this.props.state.botsFilters && this.props.state.botsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ИМЯ</span>
                                    {
                                        this.props.state.botsFilters && this.props.state.botsFilters.order == "bot_name" ?
                                            this.props.state.botsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "bot_telegram_key", desc: this.props.state.botsFilters && this.props.state.botsFilters.order != "bot_telegram_key" && 1 || this.props.state.botsFilters && this.props.state.botsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ТЕЛЕГРАМ ТОКЕН</span>
                                    {
                                        this.props.state.botsFilters && this.props.state.botsFilters.order == "bot_telegram_key" ?
                                            this.props.state.botsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>НАСТРОЙКИ</span>
                                </div>
                            </th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            this.props.state.bots && this.props.state.bots.map((bot, botKey) => (
                                <tr key = {botKey}>
                                    <td className="numeric">{ bot.bot_date_update }</td>
                                    <td className="numeric">{ bot.bot_name || "—" }</td>
                                    <td className="numeric">{ bot.bot_telegram_key || "—"}</td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 24, item_id: bot.bot_id})} style={{color: bot.bot_id != (this.props.state.bot && this.props.state.bot.bot_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer", width: "24px"}}>settings</i>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                   (this.props.state.botsFilters && this.props.state.botsFilters.offset) >= (this.props.state.botsFilters && this.props.state.botsFilters.limit) ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.botsFilters && +this.props.state.botsFilters.offset) - (this.props.state.botsFilters && +this.props.state.botsFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {(this.props.state.botsFilters && this.props.state.botsFilters.offset) || 0} по {(this.props.state.botsFilters && +this.props.state.botsFilters.offset) || 0 + (this.props.state.bots && +this.props.state.bots.length) || 0}</span>
                                {
                                    (this.props.state.bots && this.props.state.bots.length) < (this.props.state.botsFilters && this.props.state.botsFilters.limit) ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.botsFilters && +this.props.state.botsFilters.offset) + (this.props.state.botsFilters && +this.props.state.botsFilters.limit)})}>
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
}))(Tablebots);