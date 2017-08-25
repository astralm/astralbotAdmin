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
import { getSessions, setFilter, setOffset, setOrder, setViewSession } from '../../../../../actions/index.js';
class TableBody extends React.Component {
    setViewSession(session_id){
        this.props.setViewSession(session_id);
        if(session_id)
            this.props.router.push("app/dialog");
    }
    bindSession(e){
        let target = e.target,
            session_id = target.parentNode.parentNode.parentNode.getAttribute("data-session_id"),
            userId = this.state.userId;
        this.props.bindSession(userId, session_id);
    }
    unbindSession(e){
        let target = e.target,
            session_id = target.parentNode.parentNode.parentNode.getAttribute("data-session_id"),
            userId = this.state.userId;
        this.props.unbindSession(userId, session_id);
    }
    setFilter(type, user_id){
        this.props.setFilter(type, user_id);
    }
    offset(e){
        this.props.setOffset(e.target.parentNode.parentNode.getAttribute('data-offset'));
        this.state.offset = e.target.parentNode.parentNode.getAttribute('data-offset');
        this[this.props.switch + "Sessions"]();
    }
    setOffset(offset){
        this.props.setOffset(offset);
    }
    setOrder(name, desc){
        this.props.setOrder(name, desc);
    }
    componentWillMount(){
        this.props.getSessions(this.props.filters || null, this.props.order || null, this.props.offset || null);
    }
    componentDidUpdate(){
        this.props.getSessions(this.props.filters || null, this.props.order || null, this.props.offset || null);
    }
    render() {
        return (
            <div>
                <section className="box box-default">
                    <div className="box-body">
                        <List>
                            <RaisedButton style = {{marginRight: "5px"}} secondary = {this.props.filters.find(item => (item.type == "active")) ? true : false} label = "Активные" onClick = {this.setFilter.bind(this, "active")}/>
                            <RaisedButton style = {{marginRight: "5px"}} secondary = {this.props.filters.find(item => (item.type == "inactive")) ? true : false} label = "Неактивные" onClick = {this.setFilter.bind(this, "inactive")}/>
                            <RaisedButton style = {{marginRight: "5px"}} secondary = {this.props.filters.find(item => (item.type == "error")) ? true : false} label = "Ошибки" onClick = {this.setFilter.bind(this, "error")}/>
                            <RaisedButton style = {{marginRight: "5px"}} secondary = {this.props.filters.find(item => (item.type == "success")) ? true : false} label = "Без ошибок" onClick = {this.setFilter.bind(this, "success")}/>
                            <RaisedButton style = {{marginRight: "5px"}} secondary = {this.props.filters.find(item => (item.type == "free")) ? true : false} label = "Свободные" onClick = {this.setFilter.bind(this, "free")}/>
                            <RaisedButton style = {{marginRight: "5px"}} secondary = {this.props.filters.find(item => (item.type == "busy")) ? true : false} label = "Занятые" onClick = {this.setFilter.bind(this, "busy")}/>
                            <RaisedButton style = {{marginRight: "5px"}} secondary = {this.props.filters.find(item => (item.type == "user")) ? true : false} label = "Ваши" onClick = {this.setFilter.bind(this, "user", this.props.userId)}/>
                            <RaisedButton secondary = {this.props.filters.length > 0 ? false : true} label = "Все" onClick = {this.setFilter.bind(this, "all")}/>
                        </List>
                    </div>
                </section>
                <article className="article">
                    <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                        <table className="mdl-data-table">
                            <thead>
                                <tr>
                                    <th className="numeric">SESSION ID</th>
                                    <th className="numeric">USER QUESTION</th>
                                    <th className="numeric">BOT ANSWER</th>
                                    <th className="numeric">STATUS</th>
                                    <th className="numeric">ADMINISTRATOR</th>
                                    <th className="numeric">ERROR</th>
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
                            {this.props.offset >= 50 ? <IconButton onClick={this.setOffset.bind(this, this.props.offset - 50)}><i className="material-icons">keyboard_arrow_left</i></IconButton> : null}
                            <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {this.props.offset} по {+this.props.offset+this.props.sessions.length}</span>
                            {this.props.sessions.length < 50 ? null : <IconButton onClick={this.setOffset.bind(this, +this.props.offset + 50)}><i className="material-icons">keyboard_arrow_right</i></IconButton>}
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
}), { getSessions, setFilter, setOffset, setOrder, setViewSession })(TableBody);