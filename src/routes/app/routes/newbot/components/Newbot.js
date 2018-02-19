import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { push } from 'react-router-redux';
class NewBot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: "",
            name: ""
        };
    }
    createBot() {
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "newBot",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.name,
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
                                            floatingLabelText="Имя"
                                            fullWidth
                                            errorText = {!this.state.name && "Поле должно быть заполнено"}
                                            value = {this.state.name}
                                            onInput = {(e) => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Телеграм токен"
                                            type="text"
                                            fullWidth
                                            value = {this.state.token}
                                            onInput = {(e) => {this.setState({token: e.target.value})}}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {this.state.name && <RaisedButton label="Создать" onClick={this.createBot.bind(this)} secondary/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(NewBot);