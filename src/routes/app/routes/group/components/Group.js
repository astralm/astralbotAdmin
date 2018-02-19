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
class Group extends React.Component {
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
    deleteGroup(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "deleteGroup",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.group.group_id
                ]
            }
        })
    }
    render() {
        console.log(this.props.state.group);
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Группа</h4>
                                    <p>
                                        <strong>ID: </strong> {this.props.state.group && this.props.state.group.group_id || "—"} <br/>
                                        <strong>Название: </strong> {this.props.state.group && this.props.state.group.group_name || "—"} <br/>
                                        <strong>Количество элементов в группе: </strong> {this.props.state.group && this.props.state.group.group_items_count || "—"} <br/>
                                        <strong>Бот: </strong> {this.props.state.group && this.props.state.group.bot_name || "—"} <br/>
                                        <strong>Тип: </strong> {this.props.state.group && this.props.state.group.type_id == 6 && "Интенты" || this.props.state.group.type_id == 7 && "Синонимы" || "—"} <br/>
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.goTo.bind(this, {page_id: 33, item_id: this.props.state.group && this.props.state.group.group_id})} style = {{marginRight: "10px"}} secondary />
                                    <RaisedButton label="Удалить" onClick = {this.deleteGroup.bind(this)} backgroundColor = "#e65d5d" labelColor = "#fff" />
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
}))(Group);