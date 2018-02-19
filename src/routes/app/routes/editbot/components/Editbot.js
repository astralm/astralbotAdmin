import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
class EditBot extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            name: this.props.state.bot && this.props.state.bot.bot_name || "",
            token: this.props.state.bot && this.props.state.bot.bot_telegram_key || ""
        }
    }
    save(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "updateBotInfo",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.bot.bot_id,
                    this.state.name || null,
                    this.state.token || null
                ]
            }
        });
    }
    render() {
        return (
            <div>
                <div className="body-inner">
                    <div className="card bg-white">
                        <div className="card-content">
                            <form className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Имя бота"
                                            type="name"
                                            fullWidth
                                            value = {this.state.name}
                                            errorText = {!this.state.name && "Имя не должно быть пустым"}
                                            onInput = {e => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Токен телеграма"
                                            type="text"
                                            fullWidth
                                            value={this.state.token}
                                            onInput = {e => {this.setState({token: e.target.value})}}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.state.name && <RaisedButton label="Сохранить" onClick = {this.save.bind(this)} secondary />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(EditBot);