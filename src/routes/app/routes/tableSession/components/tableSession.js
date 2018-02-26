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
class TableSession extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setSessionsFilter",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    JSON.stringify(options)
                ] 
            }
        });
    }
    bindDialog(dialog_id){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "bindDialog",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    dialog_id
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
    componentWillMount(){
        if (this.props.state.page != 8){
            this.props.dispatch({
                type: "Query",
                middleware: true,
                data: {
                    query: "changePage",
                    values: [
                        this.props.state.user.hash,
                        this.props.state.socket.hash,
                        8,
                        0
                    ]
                }
            });
        }
    }
    render() {
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card style={{marginBottom: "10px"}}>
                <CardHeader title="Фильтрация" actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Активные" 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("active") > -1
                            }
                            onCheck = {this.setFilter.bind(this, {name: "active"})}
                        />
                        <Checkbox label="Не активные" 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("inactive") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "inactive"})}
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Свободные" 
                            style={{display: "inline-block"}} 
                            title = "доступно только когда не выбран параметр 'Ваши'"
                            disabled = {this.props.state.sessionsFilters.filters && this.props.state.sessionsFilters.filters.indexOf("user") > -1} 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("free") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "free"})}
                        />
                        <Checkbox label="Занятые" 
                            style={{display: "inline-block"}} 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("busy") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "busy"})}
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Ошибки" 
                            style={{display: "inline-block"}} 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("error") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "error"})}
                        />
                        <Checkbox label="Без ошибок" 
                            style={{display: "inline-block"}} 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("success") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "success"})}
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Ваши" 
                            style={{display: "inline-block"}}
                            title = "доступно только когда не выбран параметр 'Свободные'"
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("user") > -1 &&
                                true || false
                            }
                            disabled = {this.props.state.sessionsFilters.filters && this.props.state.sessionsFilters.filters.indexOf("free") > -1}
                            onCheck = {this.setFilter.bind(this, {name: "user"})}
                        />
                        <Checkbox label="Все" 
                            style={{display: "inline-block"}} 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("all") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "all"})}
                        />
                    </div>
                    <div style={{float: "right", width: "20%", verticalAlign: "top", overflowX: "hidden"}}>
                        <Checkbox label="Сегодня" 
                            style={{display: "inline-block"}}
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("today") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "today"})}
                        />
                        <Checkbox label="Вчера" 
                            style={{display: "inline-block"}}
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("yesterday") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "yesterday"})}
                        />
                        <Checkbox label="Собственная дата" 
                            style={{display: "inline-block"}}
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("customdate") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "customdate"})}
                        />
                        <DatePicker 
                            disabled = {false}
                            id="firstDate"
                            value = {this.props.state.sessionsFilters.dateStart && this.props.state.sessionsFilters.dateStart != "null" ? new Date(this.props.state.sessionsFilters.dateStart) : new Date()}
                            onChange = {((foo, date) =>{
                                this.setFilter({dateStart: (date.getTime()/1000).toString()})
                            }).bind(this)}
                            disabled = {this.props.state.sessionsFilters.filters && this.props.state.sessionsFilters.filters.indexOf("customdate") == -1}
                        />
                        <DatePicker 
                            disabled = {false}
                            id="endDate"
                            value = {this.props.state.sessionsFilters.dateEnd && this.props.state.sessionsFilters.dateEnd != "null" ? new Date(this.props.state.sessionsFilters.dateEnd) : new Date()}
                            onChange = {((foo, date) =>{
                                this.setFilter({dateEnd: (date.getTime()/1000).toString()})
                            }).bind(this)}
                            disabled = {this.props.state.sessionsFilters.filters && this.props.state.sessionsFilters.filters.indexOf("customdate") == -1}
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", height: "100px", overflowY: "auto", verticalAlign: "top", marginTop: "20px"}}>
                        {
                            this.props.state.bots && this.props.state.bots.map((bot,key) => (
                                <Checkbox label={bot.bot_name} 
                                    style={{display: "inline-block"}}
                                    key = {key}
                                    checked = {this.props.state.sessionsFilters.bots && this.props.state.sessionsFilters.bots.indexOf(bot.bot_id) != -1 && this.props.state.sessionsFilters.filters.indexOf("bot") != -1}
                                    onCheck = { 
                                        ((bot_id)=>{
                                            let bots = this.props.state.sessionsFilters.bots || [],
                                                responce = {};
                                            bots.indexOf(bot_id) == -1 ? bots.push(bot_id) : bots.splice(bots.indexOf(bot_id), 1);
                                            bots.length == 0 && this.props.state.sessionsFilters.filters.indexOf("bot") > -1 ?
                                                (responce.name = "bot") :
                                                this.props.state.sessionsFilters.filters.indexOf("bot") == -1 && bots.length > 0 && (responce.name = "bot");
                                            responce.bots = bots;
                                            this.setFilter.call(this, responce);
                                        }).bind(this, bot.bot_id)
                                    }
                                />
                            ))
                        }
                    </div>
                        <div style={{display: "inline-block", width: "20%", verticalAlign: "top", marginTop: "20px"}}>
                            <Checkbox label="Виджет" 
                                style={{display: "inline-block"}}
                                checked = {
                                    this.props.state.sessionsFilters && 
                                    this.props.state.sessionsFilters.filters && 
                                    this.props.state.sessionsFilters.filters.indexOf("widget") > -1 &&
                                    true || false
                                }
                                onCheck = {this.setFilter.bind(this, {name: "widget"})}
                            />
                            <Checkbox label="Телеграм" 
                                style={{display: "inline-block"}} 
                                checked = {
                                    this.props.state.sessionsFilters && 
                                    this.props.state.sessionsFilters.filters && 
                                    this.props.state.sessionsFilters.filters.indexOf("telegram") > -1 &&
                                    true || false
                                }
                                onCheck = {this.setFilter.bind(this, {name: "telegram"})}
                            />
                        </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top", marginTop: "20px"}}>
                        <Checkbox label="Нет диалога" 
                            style={{display: "inline-block"}}
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("empty") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "empty"})}
                        />
                        <Checkbox label="Есть диалог" 
                            style={{display: "inline-block"}} 
                            checked = {
                                this.props.state.sessionsFilters && 
                                this.props.state.sessionsFilters.filters && 
                                this.props.state.sessionsFilters.filters.indexOf("notempty") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "notempty"})}
                        />
                    </div>
                </CardText>
            </Card>
            <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                <table className="mdl-data-table table-bordered table-striped cf no-margin">
                    <thead className="cf">
                    <tr>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "dialog_id", desc: this.props.state.sessionsFilters.order != "dialog_id" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>
                                <span style={{borderBottom: "1px dashed"}}>ID</span>
                                {
                                    this.props.state.sessionsFilters.order == "dialog_id" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null
                                }
                            </div>
                        </th>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "dialog_date_update", desc: this.props.state.sessionsFilters.order != "dialog_date_update" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>
                                <span style={{borderBottom: "1px dashed"}}>ДАТА</span>
                                {
                                    this.props.state.sessionsFilters.order == "dialog_date_update" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                }
                            </div>
                        </th>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "client_message_text", desc: this.props.state.sessionsFilters.order != "client_message_text" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>    
                                <span style={{borderBottom: "1px dashed"}}>ВОСПРОС</span>
                                {
                                    this.props.state.sessionsFilters.order == "client_message_text" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                }
                            </div>
                        </th>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "user_message_text", desc: this.props.state.sessionsFilters.order != "user_message_text" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>    
                                <span style={{borderBottom: "1px dashed"}}>ОТВЕТ</span>
                                {
                                    this.props.state.sessionsFilters.order == "user_message_text" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                }
                            </div>
                        </th>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "socket_url", desc: this.props.state.sessionsFilters.order != "socket_url" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>    
                                <span style={{borderBottom: "1px dashed"}}>СТРАНИЦА</span>
                                {
                                    this.props.state.sessionsFilters.order == "socket_url" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                }
                            </div>
                        </th>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "type_id", desc: this.props.state.sessionsFilters.order != "type_id" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>    
                                <span style={{borderBottom: "1px dashed"}}>ТИП СЕССИИ</span>
                                {
                                    this.props.state.sessionsFilters.order == "type_id" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                }
                            </div>
                        </th>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "dialog_active", desc: this.props.state.sessionsFilters.order != "dialog_active" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>
                                <span style={{borderBottom: "1px dashed"}}>СТАТУС</span>
                                {
                                    this.props.state.sessionsFilters.order == "dialog_active" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                }
                            </div>
                        </th>
                        <th>
                            <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "user_name", desc: this.props.state.sessionsFilters.order != "user_name" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>    
                                <span style={{borderBottom: "1px dashed"}}>КОНСУЛЬТАНТ</span>
                                {
                                    this.props.state.sessionsFilters.order == "user_name" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                }
                            </div>
                        </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "dialog_error", desc: this.props.state.sessionsFilters.order != "dialog_error" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ОШИБКА</span>
                                    {
                                        this.props.state.sessionsFilters.order == "dialog_error" ?
                                        this.props.state.sessionsFilters.desc ?
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                        null 
                                    }
                                </div>
                            </th>
                            <th>ДИАЛОГ</th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "client_id", desc: this.props.state.sessionsFilters.order != "client_id" && 1 || this.props.state.sessionsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>КЛИЕНТ</span>
                                    {
                                        this.props.state.sessionsFilters.order == "client_id" ?
                                        this.props.state.sessionsFilters.desc ?
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
                            this.props.state.sessions && this.props.state.sessions.map((session, sessionKey) => (
                                <tr key = {sessionKey}>
                                    <td className="numeric">{ session.dialog_id }</td>
                                    <td className="numeric" style={{whiteSpace: "nowrap"}}>{ session.dialog_date_update }</td>
                                    <td className="numeric" title={session.client_message} style={{textAlign: "left"}}> 
                                        { session.client_message }
                                    </td>
                                    <td className="numeric" title={session.user_message} style={{textAlign: "left"}}>
                                        { session.user_message }
                                    </td>
                                    <td className="numeric" title={session.socket_url} style={{textAlign: "left"}}>
                                        <a href={ session.socket_url }>{ session.socket_url }</a>
                                    </td>
                                    <td className="numeric" title="Тип сессии" style={{textAlign: "left"}}>
                                        { session.type_id == 1 ? "Виджет" : "telegram" }
                                    </td>
                                    <td className="numeric">
                                        { 
                                            session.dialog_active ? 
                                                <i className="material-icons" style={{color: "#4CAF50"}}>brightness_1</i> : 
                                                <i className="material-icons" style={{color: "#EF6C00"}}>brightness_1</i> 
                                        }
                                    </td>
                                    <td className="numeric">
                                        { 
                                            session.user_name ?
                                                session.user_id == this.props.state.user.id ?
                                                    <i className="material-icons" onClick = {this.bindDialog.bind(this, session.dialog_id)} style = {{color: "#EF6C00", cursor: "pointer"}} >remove_circle_outline</i> :
                                                    session.user_name :
                                                <i className="material-icons" onClick = {this.bindDialog.bind(this, session.dialog_id)} style = {{color: "#4CAF50", cursor: "pointer"}}>add_circle_outline</i>
                                        }
                                    </td>
                                    <td className="numeric">
                                        { 
                                            session.dialog_error ? 
                                                <i className="material-icons" style={{color: "#EF6C00"}}>info_outline</i> : 
                                                <i className="material-icons" style={{color: "#9E9E9E"}}>close</i>
                                        }
                                    </td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 9, item_id: session.dialog_id})} style={{color: session.dialog_id != (this.props.state.dialog && this.props.state.dialog.dialog_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer"}}>remove_red_eye</i>
                                    </td>
                                    <td className="numeric">
                                        {
                                            session.client_id ?
                                                <i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 11, item_id: session.client_id})} style={{color: session.client_id != (this.props.state.client && this.props.state.client.client_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer", width: "24px"}}>persona</i> :
                                                ""
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                    this.props.state.sessionsFilters.offset >= this.props.state.sessionsFilters.limit ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.state.sessionsFilters.offset - +this.props.state.sessionsFilters.limit})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {this.props.state.sessionsFilters.offset} по {(+this.props.state.sessionsFilters.offset || 0)+(this.props.state.sessions && +this.props.state.sessions.length || 0)}</span>
                                {
                                    this.props.state.sessions && this.props.state.sessions.length < this.props.state.sessionsFilters.limit ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.state.sessionsFilters.offset + +this.props.state.sessionsFilters.limit})}>
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
}))(TableSession);