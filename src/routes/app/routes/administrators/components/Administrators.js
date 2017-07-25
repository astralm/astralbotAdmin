import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import { getUsers } from '../../../../../actions/index.js';
class Administrators extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: props.users,
            allUsers: props.users,
            onlineUsers: props.users.filter(user => { return +user.user_status == 1 }),
            offlineUsers: props.users.filter(user => { return +user.user_status == 0 })
        };
    }
    componentWillMount(){
        this.props.getUsers();
    }
    all(){
        this.setState({
            users: this.state.allUsers
        })
    }
    online(){
        this.setState({
            users: this.state.onlineUsers
        });
    }
    offline(){
        this.setState({
            users: this.state.offlineUsers
        })
    }
    render() {
        return (
            <div>
                <section className="box box-default">
                    <div className="box-body">
                        <List>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Онлайн" leftIcon={<ContentInbox />} onClick = {this.online.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Оффлайн" leftIcon={<ActionGrade />} onClick = {this.offline.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Все" leftIcon={<ActionGrade />} onClick = {this.all.bind(this)}/></div>
                            <div style={{display:'inline-block'}}><RaisedButton label="Добавить нового" href="#/app/newuser" secondary /></div>
                        </List>
                    </div>
                </section>
                <article className="article">
                    <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                        <table className="mdl-data-table">
                            <thead>
                            <tr>
                                <th className="numeric">NAME</th>
                                <th className="numeric">EMAIL</th>
                                <th className="numeric">STATUS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map((item, itemKey) => (
                                    <tr key={itemKey}>
                                        {
                                            Object.keys(item).map((key, optionKey) => (
                                                <td className = "numeric" key={optionKey}>{key == 'user_status' ? item[key] == 1 ? "online" : "offline" : item[key]}</td>
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
    users : state.app.get('users') ? state.app.get('users').toJS() : []
}), {getUsers})(Administrators);


