import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {push} from 'react-router-redux';
class Intent extends React.Component {
    goTo(props){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "changePage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    props.page_id,
                    props.item_id || 0
                ]
            }
        });
    }
    deleteIntent(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "deleteIntent",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.intent.intent_id
                ]
            }
        })
    }
    render() {
        console.log(this.props.state.intent);
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Интент</h4>
                                    <p>
                                        <strong>ID: </strong> {this.props.state.intent && this.props.state.intent.intent_id || "—"} <br/>
                                        <strong>Название: </strong> {this.props.state.intent && this.props.state.intent.intent_name || "—"} <br/>
                                        <strong>Группа: </strong> {this.props.state.intent && this.props.state.intent.group_name || "—"} <br/>
                                        <strong>Количество условий: </strong> {this.props.state.intent && this.props.state.intent.intent_conditions_count || "—"} <br/>
                                        <strong>Бот: </strong> {this.props.state.intent && this.props.state.intent.bot_name || "—"} <br/>
                                        <strong>Ответ: </strong> {
                                            this.props.state.intent &&
                                            <pre 
                                               style={{
                                                    background: "#e4e4e4",
                                                    padding: "10px 20px"
                                                }} 
                                            >
                                                {this.props.state.intent.answer_text}
                                            </pre>
                                            || "—"
                                        } <br/>
                                        <strong>Условия: </strong> 
                                        {
                                            this.props.state.intent && this.props.state.intent.conditions && this.props.state.intent.conditions.length > 0 && this.props.state.intent.conditions.map((condition, conditionKey) => (
                                                <div 
                                                    key={conditionKey}
                                                    style={{
                                                        background: "#e4e4e4",
                                                        padding: "10px 20px",
                                                        margin: "5px 0"
                                                    }}
                                                >
                                                    {
                                                        condition.map((entities, entitiesKey) => (
                                                            <span key={entitiesKey} style={{margin: "4px"}}>{entities.entities_name}</span>
                                                        ))
                                                    }
                                                </div>
                                            )) || "—"
                                        }
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.goTo.bind(this, {page_id: 29, item_id: this.props.state.intent && this.props.state.intent.intent_id})} style = {{marginRight: "10px"}} secondary />
                                    <RaisedButton label="Удалить" onClick = {this.deleteIntent.bind(this)} backgroundColor = "#e65d5d" labelColor = "#fff" />
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
}))(Intent);