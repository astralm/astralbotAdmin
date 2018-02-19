import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class DialogSimple extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    bindDialog(dialog_id){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "bindDialog",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    dialog_id
                ]
            }
        });
    }
    onOffBot(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "onOffBotInDialog",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.dialog.dialog_id
                ]
            }
        });
    }
    sendMessage(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "userMessage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.dialog.dialog_id,
                    this.state.message
                ]
            }
        });
        this.setState({message: ""});
    }
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
    removeError(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "removeError",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.dialog.dialog_id
                ]
            }
        });
    }
    componentDidUpdate(){
        window.scrollTo(0, document.body.scrollHeight);
    }
    render() {
        return (
            <div>
                <div className="box box-default table-box table-responsive mdl-shadow--2dp" style={{position:'fixed', zIndex:'999'}}>
                    <table className="mdl-data-table" style={{width:'72%', background: 'inherit', border: 'none'}}>
                        <thead>
                        <tr>
                            <th className="numeric" style={{width:'20%'}}>ID SESSION : { this.props.state.dialog && this.props.state.dialog.dialog_id }</th>
                            <th className="numeric" style={{width:'20%'}}>Администратор : { this.props.state.dialog && this.props.state.dialog.user_name || "-" }</th>
                            <th className="numeric" style={{width:'20%'}}>Ошибка : { this.props.state.dialog && this.props.state.dialog.dialog_error ? "Да" : "Нет" }</th>
                            <th className="numeric" style={{width:'20%'}}>Статус : { this.props.state.dialog && this.props.state.dialog.dialog_active ? "В сети" : "Отключён" } </th>
                            <th className="numeric" style={{width:'20%'}}>Тип : { this.props.state.dialog && this.props.state.dialog.type_id == 1 ? "Виджет" : "Telegram" }</th>
                            <th className="numeric" style={{width:'20%'}}>Клиент : <span style={{borderBottom: "1px solid #000", cursor: "pointer"}} onClick = {this.goTo.bind(this, {page_id: 11, item_id: this.props.state.dialog && this.props.state.dialog.client_id})}>{ this.props.state.dialog && this.props.state.dialog.client_name }</span></th>
                            {
                                this.props.state.dialog && !this.props.state.dialog.user_id &&
                                <th className="numeric" style={{width:'20%'}}>
                                    <RaisedButton label="Взять" onClick = {this.bindDialog.bind(this, this.props.state.dialog.dialog_id)} secondary />
                                </th> ||
                                this.props.state.dialog && this.props.state.dialog.user_id == this.props.state.user.id &&
                                <th className="numeric" style={{width:'20%'}}>
                                    <RaisedButton label="Отказаться" onClick = {this.bindDialog.bind(this, this.props.state.dialog.dialog_id)} secondary />
                                </th>
                            }
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="ui-timline-container">
                    <section className="ui-timeline">
                        {
                            this.props.state.dialog && this.props.state.dialog.messages.map((message, key) => (
                                <article className={"tl-item" + (message.message_client ? " alt" : "")} key = {key}>
                                    <div className="tl-body">
                                        <div className="tl-entry">
                                            <div className="tl-time" style={{fontSize: '10px'}}>{ message.message_date_create }</div>
                                            <div className="tl-content">
                                                <h4 className="tl-tile text-warning">
                                                    { 
                                                        message.message_client && (message.client_name || message.client_username) ||
                                                        message.user_name || "Бот"
                                                    }
                                                </h4>
                                                <p>{ message.message_text }</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        }
                    </section>
                </div>
                {
                    this.props.state.dialog && this.props.state.dialog.user_id == this.props.state.user.id &&
                        <div className="box box-default table-box table-responsive mdl-shadow--2dp" style={{bottom: '0', padding: '10px 0', position: 'fixed', zIndex: '999'}}>
                            <form role="form">
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <RaisedButton onClick = {this.onOffBot.bind(this)} label={this.props.state.dialog.dialog_bot_work ? "Выключить бота" : "Включить бота"} primary = {!this.props.state.dialog.dialog_bot_work ? true : false} className="btn-w-md"/>
                                        {
                                            this.props.state.dialog.dialog_error &&
                                            <RaisedButton label="Сессия больше не имеет ошибки" style={{marginLeft: "20px"}} className="btn-w-md" onClick={this.removeError.bind(this)}/> || ""
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" value = {this.state.message} disabled={this.props.state.dialog.dialog_bot_work ? true : false} className="form-control" placeholder={this.props.state.dialog.dialog_bot_work ? "Выключите бота чтобы ввести сообщение" : "Введите ваше сообщение"} onKeyPress = {e => {e.key == "Enter" && this.sendMessage.call(this)}} onInput = {e => {this.setState({message: e.target.value})}} style={{margin: '0 14px', fontSize: '14px', display: 'inline-block', width: 'calc(100% - 360px)', varticalAlign: 'middle' }} />
                                    {
                                        !this.props.state.dialog.dialog_bot_work &&
                                           <i className="material-icons" style={{verticalAlign: 'top', cursor: 'pointer'}} onClick = {this.sendMessage.bind(this)}>send</i>
                                    }
                                </div>
                            </form>
                        </div>
                }
            </div>
        );
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(DialogSimple);

