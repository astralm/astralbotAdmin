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
    constructor(props) {
        super(props)


        this.state = {
            h1_zag : 'Администраторы',
            users : props.users
        }
    }
    componentWillMount(){
        this.props.getUsers()
    }
    render() {
        const style = {
            paddingTop: '20px;',
            paddingBottom: '20px;'
        }
        return (
            <div>

                <section className="box box-default">
                    <div className="box-body">
                        <List>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Онлайн" leftIcon={<ContentInbox />} /></div>
                            <div style={{display:'inline-block'}}><ListItem  primaryText="Оффлайн" leftIcon={<ActionGrade />} /></div>
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
                                this.state.users.map(item => (
                                    <tr>
                                        {
                                            Object.keys(item).map(key => (
                                                <td className = "numeric">{item[key]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                            {/*<tr>*/}
                                {/*<td className="numeric">Sergey</td>*/}
                                {/*<td className="numeric">psv@astralnalog.ru</td>*/}
                                {/*<td className="numeric">Online</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                                {/*<td className="numeric">Vlad</td>*/}
                                {/*<td className="numeric">vlad@astralnalog.ru</td>*/}
                                {/*<td className="numeric">Offline</td>*/}
                            {/*</tr>*/}
                            </tbody>
                        </table>
                    </div>
                </article>

            </div>
        );
    }
}
module.exports = connect(state => ({
    users : state.app.get('users').toJS()
}), {getUsers})(Administrators);


