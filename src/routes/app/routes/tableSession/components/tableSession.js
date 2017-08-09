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
import { getSessions, getUserSessions, 
         getFreeSessions, getBusySessions, 
         getErrorSessions, getSuccessSessions,
         getActiveSessions, getInactiveSessions, 
         setSwitch, setOffset,
         bindSession, unbindSession, setViewSession } from '../../../../../actions/index.js';
class TableBody extends React.Component {
    setViewSession(e){
        this.props.setViewSession(e.target.parentNode.parentNode.parentNode.getAttribute('data-session_id'));
        if(e.target.parentNode.parentNode.parentNode.getAttribute('data-session_id'))
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
    allSessions(){
        this.props.getSessions(this.state.switch == "all" ? this.state.offset : 0);
        this.props.setSwitch("all");
    }
    freeSessions(){
        this.props.getFreeSessions(this.state.switch == "free" ? this.state.offset : 0);
        this.props.setSwitch("free");
    }
    busySessions(){
        this.props.getBusySessions(this.state.switch == "busy" ? this.state.offset : 0);
        this.props.setSwitch("busy");
    }
    userSessions(){
        this.props.getUserSessions(this.state.switch == "user" ? this.state.offset : 0, this.state.userId);
        this.props.setSwitch("user");
    }
    activeSessions(){
        this.props.getActiveSessions(this.state.switch == "active" ? this.state.offset : 0);
        this.props.setSwitch("active");
    }
    inactiveSessions(){
        this.props.getInactiveSessions(this.state.switch == "inactive" ? this.state.offset : 0);
        this.props.setSwitch("inactive");
    }
    errorSessions(){
        this.props.getErrorSessions(this.state.switch == "error" ? this.state.offset : 0);
        this.props.setSwitch("error");
    }
    successSessions(){
        this.props.getSuccessSessions(this.state.switch == "success" ? this.state.offset : 0);
        this.props.setSwitch("success");
    }
    offset(e){
        this.props.setOffset(e.target.parentNode.parentNode.getAttribute('data-offset'));
        this.state.offset = e.target.parentNode.parentNode.getAttribute('data-offset');
        this[this.props.switch + "Sessions"]();
    }
    componentWillMount(){
        switch(this.props.switch){
            case "all" :
                this.props.getSessions(this.props.offset);
                break;
            case "free" :
                this.props.getFreeSessions(this.props.offset);
                break;
            case "busy" :
                this.props.getBusySessions(this.props.offset);
                break;
            case "user" :
                this.props.getUserSessions(this.props.offset);
                break;
            case "active" :
                this.props.getActiveSessions(this.props.offset);
                break;
            case "inactive" :
                this.props.getInactiveSessions(this.props.offset);
                break;
            case "error" :
                this.props.getErrorSessions(this.props.offset);
                break;
            case "success" :
                this.props.getSuccessSessions(this.props.offset);
        }
    }
    render() {
        this.state = {
            sessions: this.props.sessions,
            userId: this.props.userId,
            switch: this.props.switch,
            offset: this.props.offset
        };
        return (
            <div>
                <section className="box box-default">
                    <div className="box-body">
                        <List>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Активные" leftIcon={<ContentInbox />} onClick = {this.activeSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Неактивные" leftIcon={<ActionGrade />} onClick = {this.inactiveSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Ошибки" leftIcon={<ContentSend />} onClick = {this.errorSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Без ошибок" leftIcon={<ContentDrafts />} onClick = {this.successSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Сводные" leftIcon={<ContentInbox />} onClick = {this.freeSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Занятые" leftIcon={<ContentInbox />} onClick = {this.busySessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Ваши" leftIcon={<ContentInbox />} onClick = {this.userSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Все" leftIcon={<ContentInbox />} onClick = {this.allSessions.bind(this)}/></div>
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
                                    this.state.sessions.map((session, sessionKey) => (
                                        <tr key = {sessionKey}>
                                            {
                                                [session.session_id, 
                                                session.question, 
                                                session.answer, 
                                                session.session_status, 
                                                session.user_name || "-",
                                                session.session_error ? "true" : "false",
                                                session.session_id ? <RaisedButton label="Просмотр" data-session_id = { session.session_id } onClick = { this.setViewSession.bind(this) } secondary /> : '',
                                                (session.user_id == this.state.userId || session.user_id == 0) && session.session_id ? <RaisedButton label={session.user_id == this.state.userId ? "отказаться" : "Взять"} onClick = { session.user_id == this.state.userId ? this.unbindSession.bind(this) : this.bindSession.bind(this) } data-session_id = {session.session_id} primary /> : null].map((option, optionKey) => (
                                                    <td className="numeric" key = {optionKey}>{ optionKey == 3 ? option == 0 ? "false" : "true" : option }</td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="col-md-12">
                            {this.state.offset >= 50 ? <IconButton data-offset={this.state.offset - 50} onClick={this.offset.bind(this)}><i className="material-icons">keyboard_arrow_left</i></IconButton> : null}
                            <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {this.state.offset} по {+this.state.offset+this.state.sessions.length}</span>
                            {this.state.sessions.length < 50 ? null : <IconButton data-offset={+this.state.offset + 50} onClick={this.offset.bind(this)}><i className="material-icons">keyboard_arrow_right</i></IconButton>}
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
    offset: state.app.get('offset') ? state.app.get('offset') : 0,
    switch: state.app.get('switch') ? state.app.get('switch') : "all"
}), { getSessions, getUserSessions,
      getFreeSessions, getBusySessions,
      getErrorSessions, getSuccessSessions,
      getActiveSessions, getInactiveSessions, 
      setSwitch, setOffset,
      bindSession, unbindSession, setViewSession })(TableBody);