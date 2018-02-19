import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {push} from 'react-router-redux';
class Bot extends React.Component {
    goTo(param){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "changePage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    param.page_id,
                    param.item_id || 0
                ]
            }
        })
    }
    render() {
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Бот</h4> 
                                    <p>
                                        <strong>ID: </strong> {this.props.state.bot && this.props.state.bot.bot_id || "—"} <br/>
                                        <strong>Имя: </strong> {this.props.state.bot && this.props.state.bot.bot_name || "—"} <br/>
                                        <strong>Телеграм токен: </strong> {this.props.state.bot && this.props.state.bot.bot_telegram_key || "—"} <br/>
                                        <strong>Дата создания: </strong> {this.props.state.bot && this.props.state.bot.bot_date_create || "—"} <br/>
                                        <strong>Дата последнего обновления: </strong> {this.props.state.bot && this.props.state.bot.bot_date_update || "—"} <br/>
                                        <strong>Количество интентов: {this.props.state.bot && this.props.state.bot.bot_intents_count || 0}</strong><br/>
                                        <strong>Количество синонимов: {this.props.state.bot && this.props.state.bot.bot_entities_count || 0}</strong><br/>
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.goTo.bind(this, {page_id: 25, item_id: this.props.state.bot && this.props.state.bot.bot_id})} style={{marginBottom: "10px"}} /> <br/>
                                    <RaisedButton label="Интенты" onClick = {this.goTo.bind(this, {page_id: 6, item_id: this.props.state.bot && this.props.state.bot.bot_id})} primary style = {{marginRight: "10px"}}/>
                                    <RaisedButton label="Синонимы" onClick = {this.goTo.bind(this, {page_id: 7, item_id: this.props.state.bot && this.props.state.bot.bot_id})} primary style = {{marginRight: "10px"}}/>
                                    <RaisedButton label="Группы" onClick = {this.goTo.bind(this, {page_id: 30, item_id: this.props.state.bot && this.props.state.bot.bot_id})} primary/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(Bot);