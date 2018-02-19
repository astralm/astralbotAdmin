import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
class EditClient extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            email: this.props.state.client && this.props.state.client.client_email || "",
            phone: this.props.state.client && this.props.state.client.client_phone || "",
            name: this.props.state.client && this.props.state.client.client_name || "",
            username: this.props.state.client && this.props.state.client.client_username || ""
        }
    }
    save(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "updateClientInfo",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.email || null,
                    this.state.phone || null,
                    this.state.name || null,
                    this.state.username || null,
                    this.props.state.client.client_id || 0
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
                                            floatingLabelText="Почта"
                                            type="email"
                                            fullWidth
                                            defaultValue = {this.props.state.client && this.props.state.client.client_email || ""}
                                            errorText = {!/.*@.*\.[aA-zZ].*/.test(this.state.email) ? "Email должен быть вида: simple@mail.ru" : ""}
                                            onInput = {e => {this.setState({email: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Телефон"
                                            type="tel"
                                            fullWidth
                                            errorText = {!/^[0-9]{11}$/.test(this.state.phone) ? "Номер телефона должен содержать 11 символов" : ""}
                                            defaultValue={this.props.state.client && this.props.state.client.client_phone || ""}
                                            onInput = {e => {this.setState({phone: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Имя"
                                            type="text"
                                            fullWidth
                                            defaultValue={this.props.state.client && this.props.state.client.client_name || ""}
                                            onInput = {e => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Username"
                                            type="text"
                                            fullWidth
                                            defaultValue={this.props.state.client && this.props.state.client.client_username || ""}
                                            onInput = {e => {this.setState({username: e.target.value})}}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.props.state.client && /.*@.*\.[aA-zZ].*/.test(this.state.email) && /^[0-9]{11}$/.test(this.state.phone) && <RaisedButton label="Сохранить" onClick = {this.save.bind(this)} secondary />
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
}))(EditClient);