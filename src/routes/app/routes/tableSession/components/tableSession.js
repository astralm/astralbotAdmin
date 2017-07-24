import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import { getSessions } from '../../../../../actions/index.js';
class TableBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allSessions: props.sessions,
            sessions: props.sessions,
            userId: props.userId,
            freeSessions: props.sessions.filter(session => (!session.user_name)),
            busySessions: props.sessions.filter(session => (session.user_name)),
            userSessions: props.sessions.filter(session => (session.user_id == props.userId)),
            activeSessions: props.sessions.filter(session => (session.session_status)),
            inactiveSessions: props.sessions.filter(session => (!session.session_status))
        }
    }
    freeSessions(){
        this.setState({
            sessions: this.state.freeSessions
        })
    }
    busySessions(){
        this.setState({
            sessions: this.state.busySessions
        })
    }
    userSessions(){
        this.setState({
            sessions: this.state.userSessions
        })
    }
    activeSessions(){
        this.setState({
            sessions: this.state.activeSessions
        });
    }
    inactiveSessions(){
        this.setState({
            sessions: this.state.inactiveSessions
        })
    }
    componentWillMount(){
        this.props.getSessions()
    }
    render() {
        return (
            <div>
                <section className="box box-default">
                    <div className="box-body">
                        <List>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Активные" leftIcon={<ContentInbox />} onClick = {this.activeSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Неактивные" leftIcon={<ActionGrade />} onClick = {this.inactiveSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Ошибки" leftIcon={<ContentSend />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Без ошибок" leftIcon={<ContentDrafts />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Сводные" leftIcon={<ContentInbox />} onClick = {this.freeSessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Занятые" leftIcon={<ContentInbox />} onClick = {this.busySessions.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Ваши" leftIcon={<ContentInbox />} onClick = {this.userSessions.bind(this)}/></div>
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
                                                <RaisedButton label="Просмотр" href="#/app/dialog" secondary />,
                                                session.user_id == this.state.userId || session.user_id == 0 ? <RaisedButton label={session.user_id == this.state.userId ? "отказаться" : "Взять"} primary /> : null].map((option, optionKey) => (
                                                    <td className="numeric" key = {optionKey}>{ optionKey == 3 ? option == 0 ? "false" : "true" : option }</td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </article>

            </div>
        );
    }
}
module.exports = connect(state => ({
    sessions: state.app.get('sessions') ? state.app.get('sessions').toJS() : [],
    userId: state.app.getIn(['user', 'id'])
}), {getSessions})(TableBody);