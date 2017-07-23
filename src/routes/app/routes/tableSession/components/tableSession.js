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
            sessions: props.sessions,
            userId: props.userId
        }
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
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Активные" leftIcon={<ContentInbox />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Неактивные" leftIcon={<ActionGrade />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Ошибки" leftIcon={<ContentSend />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Без ошибок" leftIcon={<ContentDrafts />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Сводные" leftIcon={<ContentInbox />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Занятые" leftIcon={<ContentInbox />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Ваши" leftIcon={<ContentInbox />} /></div>
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
                                        <tr>
                                            {
                                                [session.session_id, 
                                                session.questions[sessions.questions.length - 1], 
                                                session.answers[session.answers.length - 1], 
                                                session.session_status, 
                                                session.user_name,
                                                <RaisedButton label="Просмотр" href="#/app/dialog" secondary />,
                                                <RaisedButton  label={session.user_id == this.state.userId ? "отказаться" : "Взять"} primary />].map((option, optionKey) => (
                                                    <td className="numeric">{ optionKey == 3 ? option == 0 ? "false" : "true" : option }</td>
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
module.exports = connect(state => {
    sessions: state.app.get('sessions') ? state.app.get('sessions').toJS() : [],
    userId: state.app.getIn(['user', 'user_id'])
}, {getSessions})(TableBody);