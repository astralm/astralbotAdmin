import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import { 
    getSessions, 
    setFilter, 
    setOffset, 
    setOrder, 
    setViewSession, 
    bindSession, 
    unbindSession,
    setFirstDate,
    setSecondDate
} from '../../../../../actions/index.js';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
class TableSession extends React.Component {    
    setViewSession(session_id){
        this.props.setViewSession(session_id);
        if(session_id)
            this.props.router.push("app/dialog");
    }
    bindSession(session_id){
        this.props.bindSession(this.props.userId, session_id);
    }
    unbindSession(session_id){
        this.props.unbindSession(this.props.userId, session_id);
    }
    setFilter(options){
        this.props.setFilter(options.filter || false, options.hasOwnProperty("offset") ? options.offset : this.props.offset, options.order || this.props.order, options.firstDate || this.props.firstDate, options.secondDate || this.props.secondDate);
    }
    componentWillMount(){
        this.props.getSessions(this.props.filters || false, this.props.order || null, this.props.offset || 0, this.props.firstDate, this.props.secondDate);
    }
    dateStart(obj, date){
        let result = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 00:00:01";
        this.props.setFirstDate(result);
        if(obj && obj.norefresh){
            return result;
        } else {
            this.setFilter({firstDate: result, offset: 0});
        }
    }
    dateEnd(obj, date){
        let result = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 23:59:59";
        this.props.setSecondDate(result);
        if(obj && obj.norefresh){
            return result;
        } else {
            this.setFilter({secondDate: result, offset: 0});
        }
    }
    today(){
        let dateEnd = new Date(),
            dateStart = new Date();
        dateEnd.setHours(23);
        dateEnd.setMinutes(59);
        dateEnd.setSeconds(59);
        dateStart.setHours(0);
        dateStart.setMinutes(0);
        dateStart.setSeconds(1);
        this.dateEnd({}, dateEnd);
        this.dateStart({}, dateStart);
        this.setFilter({
            offset: 0, 
            filter:"today", 
            firstDate: this.dateStart({norefresh: true}, dateStart), 
            secondDate: this.dateEnd({norefresh: true}, dateEnd)
        });
    }
    yesterday(){
        let dateEnd = new Date(),
            dateStart = new Date();
        dateEnd.setDate(dateEnd.getDate() - 1);
        dateStart.setDate(dateStart.getDate() - 1);
        dateEnd.setHours(23);
        dateEnd.setMinutes(59);
        dateEnd.setSeconds(59);
        dateStart.setHours(0);
        dateStart.setMinutes(0);
        dateStart.setSeconds(1);
        this.dateEnd({}, dateEnd);
        this.dateStart({}, dateStart);
        this.setFilter({
            offset: 0, 
            filter:"yesterday",
            firstDate: this.dateStart({norefresh: true}, dateStart), 
            secondDate: this.dateEnd({norefresh: true}, dateEnd)
        });
    }
    render() {
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card style={{marginBottom: "10px"}}>
                <CardHeader title="Фильтрация" actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Активные" 
                            checked = {this.props.filters.indexOf("active") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"active"})}/>
                        <Checkbox label="Не активные" 
                            checked = {this.props.filters.indexOf("inactive") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"inactive"})}/>
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Свободные" 
                            style={{display: "inline-block"}} 
                            disabled = {this.props.filters.indexOf('user') > -1 ? true : false} 
                            checked = {this.props.filters.indexOf("free") > -1 ? true : false} 
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"free"})}/>
                        <Checkbox label="Занятые" 
                            style={{display: "inline-block"}} 
                            checked = {this.props.filters.indexOf("busy") > -1 ? true : false} 
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"busy"})}/>
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Ошибки" 
                            style={{display: "inline-block"}} 
                            checked = {this.props.filters.indexOf("error") > -1 ? true : false} 
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"error"})}
                        />
                        <Checkbox label="Без ошибок" 
                            style={{display: "inline-block"}} 
                            checked = {this.props.filters.indexOf("success") > -1 ? true : false} 
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"success"})}
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top"}}>
                        <Checkbox label="Ваши" 
                            style={{display: "inline-block"}}
                            checked = {this.props.filters.indexOf("user") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"user"})}
                        />
                        <Checkbox label="Все" 
                            style={{display: "inline-block"}} 
                            checked = {this.props.filters.length > 0 || !this.props.filters ? false : true}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"all"})}
                        />
                    </div>
                    <div style={{float: "right", width: "20%", verticalAlign: "top", overflowX: "hidden"}}>
                        <Checkbox label="Сегодня" 
                            style={{display: "inline-block"}}
                            checked = {this.props.filters.indexOf("today") > -1 ? true : false}
                            onClick={this.today.bind(this)}
                        />
                        <Checkbox label="Вчера" 
                            style={{display: "inline-block"}}
                            checked = {this.props.filters.indexOf("yesterday") > -1 ? true : false}
                            onClick={this.yesterday.bind(this)}
                        />
                        <Checkbox label="Собственная дата" 
                            style={{display: "inline-block"}}
                            checked = {this.props.filters.indexOf("date") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"date"})}
                        />
                        <DatePicker 
                            onChange={this.dateStart.bind(this)}
                            disabled = {this.props.filters.indexOf("date") == -1 ? true : false}
                            id="firstDate"
                        />
                        <DatePicker 
                            onChange={this.dateEnd.bind(this)}
                            disabled = {this.props.filters.indexOf("date") == -1 ? true : false}
                            id="endDate"
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top", marginTop: "20px"}}>
                        <Checkbox label="Партнеры" 
                            style={{display: "inline-block"}}
                            checked = {this.props.filters.indexOf("partner") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"partner"})}
                        />
                        <Checkbox label="Продажа" 
                            style={{display: "inline-block"}} 
                            checked = {this.props.filters.indexOf("sale") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"sale"})}
                        />
                        <Checkbox label="Фак" 
                            style={{display: "inline-block"}} 
                            checked = {this.props.filters.indexOf("faq") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"faq"})}
                        />
                    </div>
                    <div style={{display: "inline-block", width: "20%", verticalAlign: "top", marginTop: "20px"}}>
                        <Checkbox label="Виджет" 
                            style={{display: "inline-block"}}
                            checked = {this.props.filters.indexOf("widget") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"widget"})}
                        />
                        <Checkbox label="Телеграм" 
                            style={{display: "inline-block"}} 
                            checked = {this.props.filters.indexOf("telegram") > -1 ? true : false}
                            onClick = {this.setFilter.bind(this, {offset: 0, filter:"telegram"})}
                        />
                    </div>
                </CardText>
            </Card>
            <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                <table className="mdl-data-table table-bordered table-striped cf no-margin">
                    <thead className="cf">
                    <tr>
                        <th>
                            <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_id", desc: this.props.order.name == "session_id" ? !this.props.order.desc : true}})} style={{cursor: "pointer"}}>
                                ID
                                {
                                    this.props.order.name == "session_id" ? 
                                        this.props.order.desc ? 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                        null
                                }
                            </div>
                        </th>
                        <th>
                            <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_dialog_update_date", desc: this.props.order.name == "session_dialog_update_date" ? !this.props.order.desc : true}})} style={{cursor: "pointer"}}>
                                DATE
                                {
                                    this.props.order.name == "session_dialog_update_date" ? 
                                        this.props.order.desc ? 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                        null
                                }
                            </div>
                        </th>
                        <th>
                            <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "question", desc: this.props.order.name == "question" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                ВОСПРОС
                                {
                                this.props.order.name == "question" ? 
                                    this.props.order.desc ? 
                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                    null
                                }
                            </div>
                        </th>
                        <th>
                            <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "answer", desc: this.props.order.name == "answer" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                ОТВЕТ
                                {
                                    this.props.order.name == "answer" ? 
                                        this.props.order.desc ? 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                        null
                                }
                            </div>
                        </th>
                        <th>
                            <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_status", desc: this.props.order.name == "session_status" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>
                                СТАТУС
                                {
                                    this.props.order.name == "session_status" ? 
                                        this.props.order.desc ? 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                        null
                                }
                            </div>
                        </th>
                        <th>
                            <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "user_name", desc: this.props.order.name == "user_name" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                КОНСУЛЬТАНТ
                                {
                                    this.props.order.name == "user_name" ? 
                                        this.props.order.desc ? 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                            <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                        null
                                }
                            </div>
                        </th>
                            <th>
                                <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_error", desc: this.props.order.name == "session_error" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                    ОШИБКА
                                    {
                                        this.props.order.name == "session_error" ? 
                                            this.props.order.desc ? 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                            null
                                    }
                                </div>
                            </th>
                            <th>VIEW</th> 
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            this.props.sessions.map((session, sessionKey) => (
                                <tr key = {sessionKey}>
                                    <td className="numeric">{ session.session_id }</td>
                                    <td className="numeric">{ session.session_dialog_update_date_formated }</td>
                                    <td className="numeric" title={session.question} style={{textAlign: "left"}}> 
                                        { session.question }
                                    </td>
                                    <td className="numeric" title={session.answer} style={{textAlign: "left"}}>
                                        { session.answer }
                                    </td>
                                    <td className="numeric">
                                        { 
                                            session.session_status ? 
                                                <i className="material-icons" style={{color: "#4CAF50"}}>brightness_1</i> : 
                                                <i className="material-icons" style={{color: "#EF6C00"}}>brightness_1</i> 
                                        }
                                    </td>
                                    <td className="numeric">
                                        { 
                                            session.user_name ?
                                                session.user_name == this.props.user_name ?
                                                    <i className="material-icons" style = {{color: "#EF6C00", cursor: "pointer"}} onClick = {this.unbindSession.bind(this, session.session_id)}>remove_circle_outline</i> :
                                                    session.user_name :
                                                <i className="material-icons" style = {{color: "#4CAF50", cursor: "pointer"}} onClick = {this.bindSession.bind(this, session.session_id)}>add_circle_outline</i>
                                        }
                                    </td>
                                    <td className="numeric">
                                        { 
                                            session.session_error ? 
                                                <i className="material-icons" style={{color: "#EF6C00"}}>info_outline</i> : 
                                                <i className="material-icons" style={{color: "#9E9E9E"}}>close</i>
                                        }
                                    </td>
                                    <td className="numeric">
                                        <i className="material-icons" onClick = { this.setViewSession.bind(this, session.session_id) } style={{color: session.session_id != this.props.session_id ? "#9E9E9E" : "#4CAF50", cursor: "pointer"}}>remove_red_eye</i>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "8">
                                {
                                    this.props.offset >= 50 ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.offset - 50})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {this.props.offset} по {+this.props.offset+this.props.sessions.length}</span>
                                {
                                    this.props.sessions.length < 50 ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.offset + 50})}>
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
    sessions: state.app.get('sessions') ? state.app.get('sessions').toJS() : [],
    userId: state.app.getIn(['user', 'id']),
    user_name: state.app.getIn(['user', 'name']),
    filters: state.app.get('filters') ? state.app.get('filters').toJS() : [],
    offset: state.app.get('offset') || 0,
    order: state.app.get('order') ? state.app.get('order').toJS() : {
        name: "session_id",
        desc: true
    },
    session_id: state.app.getIn(['session', 'session_id']),
    firstDate: state.app.get('firstDate'),
    secondDate: state.app.get('secondDate')
}), { 
    getSessions, 
    setFilter, 
    setOffset, 
    setOrder, 
    setViewSession, 
    bindSession, 
    unbindSession,
    setFirstDate,
    setSecondDate 
})(TableSession);