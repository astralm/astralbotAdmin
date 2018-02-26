import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: this.props.state.user.email || "",
            password: null,
            name: this.props.state.user.name || ""
        };
    }
    send(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "updateProfile",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.email,
                    this.state.password,
                    this.state.name
                ]
            }
        });
    }
    componentDidUpdate(){
        !this.state.email &&
        this.setState({
            email: this.props.state.user.email
        });
        !this.state.name &&
        this.setState({
            name: this.props.state.user.name
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
                                            floatingLabelText="Email"
                                            fullWidth
                                            value = {this.state.email}
                                            onInput = {e => {this.setState({email: e.target.value})}}
                                            errorText = {!/.*@.*\.[aA-zZ]{1}.*/.test(this.state.email) ? "Email должен быть вида 'simple@email.ru'" : ""}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Password"
                                            type="password"
                                            fullWidth
                                            defaultValue = {"*".repeat(6)}
                                            onInput = {e => {this.setState({password: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Name"
                                            type="text"
                                            fullWidth
                                            value = {this.state.name}
                                            onInput = {e => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.props.state.user && /.*@.*\.[aA-zZ]{1}.*/.test(this.state.email) && <RaisedButton label="Сохранить" onClick = {this.send.bind(this)} secondary />
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
}))(EditUser);

