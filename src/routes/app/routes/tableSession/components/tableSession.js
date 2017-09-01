import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import { getSessions, setFilter, setOffset, setOrder, setViewSession, bindSession, unbindSession } from '../../../../../actions/index.js';
class TableBody extends React.Component {
    setViewSession(session_id){
        this.props.setViewSession(session_id);
        if(session_id)
            this.props.router.push("app/dialog");
    }
    bindSession(e){
        let target = e.target,
            session_id = target.parentNode.parentNode.parentNode.getAttribute("data-session_id"),
            userId = this.props.userId;
        this.props.bindSession(userId, session_id);
    }
    unbindSession(e){
        let target = e.target,
            session_id = target.parentNode.parentNode.parentNode.getAttribute("data-session_id"),
            userId = this.props.userId;
        this.props.unbindSession(userId, session_id);
    }
    setFilter(options){
        this.props.setFilter(options.filter || false, options.hasOwnProperty("offset") ? options.offset : this.props.offset, options.order || this.props.order);
    }
    componentWillMount(){
        this.props.getSessions(this.props.filters || false, this.props.order || null, this.props.offset || 0);
    }
    render() {
        return (
            <div>
                <section className="box box-default">
                    <div className="box-body">
                        <List>
                            <RaisedButton style = {{marginRight: "5px", marginBottom: "5px"}} secondary = {this.props.filters.indexOf("active") > -1 ? true : false} label = "Активные" onClick = {this.setFilter.bind(this, {offset: 0, filter:"active"})}/>
                            <RaisedButton style = {{marginRight: "5px", marginBottom: "5px"}} secondary = {this.props.filters.indexOf("inactive") > -1 ? true : false} label = "Неактивные" onClick = {this.setFilter.bind(this, {offset: 0, filter:"inactive"})}/>
                            <RaisedButton style = {{marginRight: "5px", marginBottom: "5px"}} secondary = {this.props.filters.indexOf("error") > -1 ? true : false} label = "Ошибки" onClick = {this.setFilter.bind(this, {offset: 0, filter:"error"})}/>
                            <RaisedButton style = {{marginRight: "5px", marginBottom: "5px"}} secondary = {this.props.filters.indexOf("success") > -1 ? true : false} label = "Без ошибок" onClick = {this.setFilter.bind(this, {offset: 0, filter:"success"})}/>
                            <RaisedButton style = {{marginRight: "5px", marginBottom: "5px"}} secondary = {this.props.filters.indexOf("free") > -1 ? true : false} label = "Свободные" onClick = {this.setFilter.bind(this, {offset: 0, filter:"free"})}/>
                            <RaisedButton style = {{marginRight: "5px", marginBottom: "5px"}} secondary = {this.props.filters.indexOf("busy") > -1 ? true : false} label = "Занятые" onClick = {this.setFilter.bind(this, {offset: 0, filter:"busy"})}/>
                            <RaisedButton style = {{marginRight: "5px", marginBottom: "5px"}} secondary = {this.props.filters.indexOf("user") > -1 ? true : false} label = "Ваши" onClick = {this.setFilter.bind(this, {offset: 0, filter:"user"})}/>
                            <RaisedButton secondary = {this.props.filters.length > 0 || !this.props.filters ? false : true} label = "Все" onClick = {this.setFilter.bind(this, {filter:"all"})}/>
                        </List>
                    </div>
                </section>
                <article className="article">
                    <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                        <table className="mdl-data-table">
                            <thead>
                                <tr>
                                    <th className="numeric" onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_id", desc: this.props.order.name == "session_id" ? !this.props.order.desc : true}})} style={{cursor: "pointer"}}>
                                        SESSION ID 
                                        {
                                            this.props.order.name == "session_id" ? 
                                                this.props.order.desc ? 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>remove</i>
                                        }
                                    </th>
                                    <th className="numeric" onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "question", desc: this.props.order.name == "question" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>
                                        USER QUESTION
                                        {
                                            this.props.order.name == "question" ? 
                                                this.props.order.desc ? 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>remove</i>
                                        }
                                    </th>
                                    <th className="numeric" onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "answer", desc: this.props.order.name == "answer" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>
                                        BOT ANSWER
                                        {
                                            this.props.order.name == "answer" ? 
                                                this.props.order.desc ? 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>remove</i>
                                        }
                                    </th>
                                    <th className="numeric" onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_status", desc: this.props.order.name == "session_status" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>
                                        STATUS
                                        {
                                            this.props.order.name == "session_status" ? 
                                                this.props.order.desc ? 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>remove</i>
                                        }
                                    </th>
                                    <th className="numeric" onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "user_name", desc: this.props.order.name == "user_name" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>
                                        ADMINISTRATOR
                                        {
                                            this.props.order.name == "user_name" ? 
                                                this.props.order.desc ? 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>remove</i>
                                        }
                                    </th>
                                    <th className="numeric" onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_error", desc: this.props.order.name == "session_error" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>
                                        ERROR
                                        {
                                            this.props.order.name == "session_error" ? 
                                                this.props.order.desc ? 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                    <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>remove</i>  
                                        }
                                    </th>
                                    <th className="numeric">VIEW</th>
                                    <th className="numeric"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.sessions.map((session, sessionKey) => (
                                        <tr key = {sessionKey}>
                                            {
                                                [session.session_id, 
                                                session.question, 
                                                session.answer, 
                                                session.session_status, 
                                                session.user_name || "-",
                                                session.session_error ? "true" : "false",
                                                session.session_id ? <RaisedButton label="Просмотр" onClick = { this.setViewSession.bind(this, session.session_id) } secondary /> : '',
                                                (session.user_id == this.props.userId || session.user_id == 0) && session.session_id ? <RaisedButton label={session.user_id == this.props.userId ? "отказаться" : "Взять"} onClick = { session.user_id == this.props.userId ? this.unbindSession.bind(this) : this.bindSession.bind(this) } data-session_id = {session.session_id} primary /> : null].map((option, optionKey) => (
                                                    <td className="numeric" key = {optionKey}>{ optionKey == 3 ? option == 0 ? "false" : "true" : option }</td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="col-md-12">
                            {this.props.offset >= 50 ? <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.offset - 50})}><i className="material-icons">keyboard_arrow_left</i></IconButton> : null}
                            <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {this.props.offset} по {+this.props.offset+this.props.sessions.length}</span>
                            {this.props.sessions.length < 50 ? null : <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.offset + 50})}><i className="material-icons">keyboard_arrow_right</i></IconButton>}
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}
module.exports = connect(state => ({
    sessions: state.app.get('sessions') ? state.app.get('sessions').toJS() : [],
    userId: state.app.getIn(['user', 'id']),
    filters: state.app.get('filters') ? state.app.get('filters').toJS() : [],
    offset: state.app.get('offset') || 0,
    order: state.app.get('order') ? state.app.get('order').toJS() : {
        name: "session_id",
        desc: true
    }
}), { getSessions, setFilter, setOffset, setOrder, setViewSession, bindSession, unbindSession })(TableBody);