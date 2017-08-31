import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getSessionDialog, getSessionInfo, bindSession, unbindSession, setAnswer, startBot, stopBot } from '../../../../../actions/index.js';
class DialogItem extends React.Component{
    render(){
        return (<article className={"tl-item" + (this.props.question ? " alt" : "")}>
            <div className="tl-body">
                <div className="tl-entry">
                    <div className="tl-time" style={{fontSize: '10px'}}>{ this.props.time.match(/(.*):/)[1] }</div>
                    <div className="tl-content">
                        <h4 className="tl-tile text-warning">{ this.props.question ? "Клиент" : "Система" }</h4>
                        <p>{ this.props.message }</p>
                    </div>
                </div>
            </div>
        </article>);
    }
}
class DialogSimple extends React.Component {
    componentWillMount(){
        this.props.getSessionInfo(this.props.session.session_id);
        this.props.getSessionDialog(this.props.session.session_id);
    }
    componentDidUpdate(){
        document.body.scrollTop = document.body.scrollHeight;
    }
    bindSession(){
        this.props.bindSession(this.state.user_id, this.state.session.session_id);
    }
    unbindSession(){
        this.props.unbindSession(this.state.user_id, this.state.session.session_id);
    }
    setAnswer(){
        this.props.setAnswer(this.state.session.session_hash, this.state.session.session_id, this.state.message);
        document.getElementById("exampleInputEmail1").value = "";
    }
    startBot(){
        this.props.startBot(this.state.session.session_id);
    }
    stopBot(){
        this.props.stopBot(this.state.session.session_id);
    }
    saveAnswer(e){
        this.state.message = e.target.value;
    }
    keyPress(e){
        if(e.key == 'Enter')
            this.setAnswer();
    }
    render() {
        this.state = {
            session: this.props.session,
            user_id: this.props.user_id
        };
        this.state.session.dialog ? 
            this.state.session.dialog.map(item => (item.question_id))
            .filter((item, key, self) => (self.indexOf(item) != key))
            .filter((item, key, self) => (self.indexOf(item) == key))
            .forEach(item => {
                this.state.session.dialog.filter(dialog => (dialog.question_id == item))
                .filter((item, key) => ( key > 0 ))
                .map(item => (item.answer_id))
                .forEach(item => { 
                    this.state.session.dialog.filter(obj => (obj.answer_id == item))
                    .forEach(item => { 
                        item.question_message = null }) 
                    })
                }) 
            : null;
        return (
            <div>
                <div className="box box-default table-box table-responsive mdl-shadow--2dp" style={{position:'fixed', zIndex:'999'}}>
                    <table className="mdl-data-table" style={{width:'72%', background: 'inherit', border: 'none'}}>
                        <thead>
                        <tr>
                            <th className="numeric" style={{width:'20%'}}>ID SESSION : { this.state.session.session_id }</th>
                            <th className="numeric" style={{width:'20%'}}>Администратор : { !this.state.session.user_name ? "-" : this.state.session.user_name }</th>
                            <th className="numeric" style={{width:'20%'}}>Ошибка : { this.state.session.session_error ? "true" : "false" }</th>
                            <th className="numeric" style={{width:'20%'}}>Статус : { this.state.session.session_status ? "true" : "false" } </th>
                            {
                                this.state.session.user_id == 0 ?
                                    <th className="numeric" style={{width:'20%'}}><RaisedButton label="Взять" onClick = { this.bindSession.bind(this) } secondary /></th> :
                                    this.state.session.user_id == this.state.user_id ?
                                        <th className="numeric" style={{width:'20%'}}><RaisedButton label="Отказаться" onClick = { this.unbindSession.bind(this) } secondary /></th> :
                                        null
                            }
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="ui-timline-container">
                    <section className="ui-timeline">
                        {
                            this.state.session.dialog ? this.state.session.dialog.map((item, key) => {
                                let result = [];
                                if (item.question_message)
                                    result.push(<DialogItem question = {true} time = {item.question_date_formated} message = {item.question_message} />);
                                if (item.answer_message)
                                    result.push(<DialogItem question = {false} time = {item.answer_date_formated} message = {item.answer_message} />);
                                return result;
                            }) : null
                        }
                    </section>
                </div>
                {
                    this.state.session.user_id == this.state.user_id ?
                        <div className="box box-default table-box table-responsive mdl-shadow--2dp" style={{bottom: '0', padding: '10px 0', position: 'fixed', zIndex: '999'}}>
                            <form role="form">
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <RaisedButton label="Включить бота" primary className="btn-w-md" onClick = {this.startBot.bind(this)}/> <RaisedButton label="Выключить бота" primary className="btn-w-md" onClick = {this.stopBot.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="ваше сообщение" onKeyPress = {this.keyPress.bind(this)} onInput = {this.saveAnswer.bind(this)} style={{margin: '0 14px', fontSize: '14px', display: 'inline-block', width: 'calc(100% - 360px)', varticalAlign: 'middle' }} />
                                    <i className="material-icons" style={{verticalAlign: 'top', cursor: 'pointer'}} onClick = {this.setAnswer.bind(this)}>send</i>
                                </div>
                            </form>
                        </div> : null
                }
            </div>
        );
    }
}
module.exports = connect(state => ({
    session: state.app.get('session') ? state.app.get('session').toJS() : {},
    user_id: state.app.getIn(['user', 'id'])
}), {getSessionInfo, getSessionDialog, bindSession, unbindSession, setAnswer, startBot, stopBot})(DialogSimple);

