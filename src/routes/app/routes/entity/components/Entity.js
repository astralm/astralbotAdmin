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
class Entity extends React.Component {
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
    deleteEntities(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "deleteEntities",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.entity.entities_id
                ]
            }
        })
    }
    render() {
        console.log(this.props.state.entity);
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Синонимы</h4>
                                    <p>
                                        <strong>ID: </strong> {this.props.state.entity && this.props.state.entity.entities_id || "—"} <br/>
                                        <strong>Название: </strong> {this.props.state.entity && this.props.state.entity.entities_name || "—"} <br/>
                                        <strong>Группа: </strong> {this.props.state.entity && this.props.state.entity.group_name || "—"} <br/>
                                        <strong>Количество строк синонимов: </strong> {this.props.state.entity && this.props.state.entity.entities_entity_count || "—"} <br/>
                                        <strong>Бот: </strong> {this.props.state.entity && this.props.state.entity.bot_name || "—"} <br/>
                                        <strong>Синонимы: </strong> 
                                        {
                                            this.props.state.entity && this.props.state.entity.entities && this.props.state.entity.entities.length > 0 && this.props.state.entity.entities.map((entityObj, entityKey) => (
                                                <div 
                                                    key={entityKey}
                                                    style={{
                                                        background: "#e4e4e4",
                                                        padding: "10px 20px",
                                                        margin: "5px 0"
                                                    }}
                                                >
                                                    {
                                                        entityObj.map((essence, essenceKey) => (
                                                            <span key={essenceKey} style={{margin: "4px"}}>{essence}</span>
                                                        ))
                                                    }
                                                </div>
                                            )) || "—"
                                        }
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.goTo.bind(this, {page_id: 36, item_id: this.props.state.entity && this.props.state.entity.entities_id})} style = {{marginRight: "10px"}} secondary />
                                    <RaisedButton label="Удалить" onClick = {this.deleteEntities.bind(this)} backgroundColor = "#e65d5d" labelColor = "#fff" />
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
}))(Entity);