import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { updateUserInformation } from '../../../../../actions/index.js';
class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            name: null
        };
    }
    inputEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    inputPassword(e){
        this.setState({
            password: e.target.value
        });
    }
    inputName(e){
        this.setState({
            name: e.target.value
        });
    }
    send(){
        let [email, password, name] = [this.state.email, this.state.password, this.state.name];
        let result = [email, password, name].filter(item => (item));
        if (result.length > 0) {
            this.props.updateUserInformation(email, password, name);
        }
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
                                            onInput = {this.inputEmail.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Password"
                                            type="password"
                                            fullWidth
                                            onInput = {this.inputPassword.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Name"
                                            type="text"
                                            fullWidth
                                            onInput = {this.inputName.bind(this)}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            <RaisedButton label="Сохранить" href='#/app/profile' onClick = {this.send.bind(this)} secondary />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(null, {updateUserInformation})(EditUser);

