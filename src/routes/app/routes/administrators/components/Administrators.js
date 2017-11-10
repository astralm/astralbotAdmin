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
            filter: "users"
        };
    }
    componentWillMount(){
        this.props.getUsers();
    }
    all(){
        this.setState({
            filter: "users"
        })
    }
    online(){
        this.setState({
            filter: "onlineUsers"
        });
    }
    offline(){
       this.setState({
            filter: "offlineUsers"  
       });
    }
    render() {
        this.online = this.online.bind(this);
        this.offline = this.offline.bind(this);
        this.all = this.all.bind(this);
        return (
            <div>
                <section className="box box-default">
                    <div className="box-body">
                        <List>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Онлайн" leftIcon={<ContentInbox />} onClick = {this.online}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Оффлайн" leftIcon={<ActionGrade />} onClick = {this.offline}/></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Все" leftIcon={<ActionGrade />} onClick = {this.all}/></div>
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
                                this.props[this.state.filter].map((item, itemKey) => (
                                    <tr key={itemKey}>
                                        {
                                            Object.keys(item).map((key, optionKey) => (
                                                key != "user_id" ? <td className = "numeric" key={optionKey}>{key == 'user_status' ? item[key] == 1 ? "online" : "offline" : item[key]}</td> : null
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
    users : state.app.get('users') ?
        state.app.get('users').toJS() :
        [],
    onlineUsers : state.app.get('onlineUsers') ?
        state.app.get('onlineUsers').toJS() :
        [],
    offlineUsers : state.app.get('offlineUsers') ?
        state.app.get('offlineUsers').toJS() :
        []
}), {getUsers})(Administrators);


