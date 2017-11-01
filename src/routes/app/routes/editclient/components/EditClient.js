import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { updateClientInformation, getClient } from '../../../../../actions/index.js';
import { push } from 'react-router-redux';
class EditClient extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: this.props.client.client_email || "",
            phone: this.props.client.client_phone || "",
            name: this.props.client.client_name || ""
        };
    }
    componentWillMount(){
        if(this.props.client){
            this.props.getClient(this.props.client.client_id);
        }
    }
    inputEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    inputPhone(e){
        if(e.target.value.length > 11){
            e.target.value = e.target.value.substr(0,11);
        }
        if(!/[0-9]/.test(e.target.value[e.target.value.length - 1])){
            e.target.value = e.target.value.substr(0, e.target.value.length - 1);
        }
        this.setState({
            phone: e.target.value
        });
    }
    inputName(e){
        this.setState({
            name: e.target.value
        });
    }
    send(){
        let [email, phone, name] = [this.state.email, this.state.phone, this.state.name];
        let result = {
            session_id: this.props.client.session_id,
            client_id: this.props.client.client_id
        };
        if(email && email != this.props.client.client_email){
            result.client_email = email;
        }
        if(phone && phone != this.props.client.client_phone){
            result.client_phone = phone;
        }
        if(name && name != this.props.client.client_name){
            result.client_name = name;
        }
        if(Object.keys(result).length > 2 && (phone.length == 11 || !phone) && (/.*@.*\..*/.test(email) || !email)){
            this.props.updateClientInformation(result);
            this.props.push("/app/client");
        }
        if(phone.length != 11){
            this.setState({
                phoneError: true
            })
        } else {
            this.setState({
                phoneError: false
            })  
        }
        if(!/.*@.*\..*/.test(email)){
            this.setState({
                emailError: true
            })
        } else {
            this.setState({
                emailError: false
            })
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
                                            type="email"
                                            fullWidth
                                            defaultValue = {this.props.client.client_email || ""}
                                            errorText = {this.state.emailError ? "Email должен быть вида: simple@mail.ru" : ""}
                                            onInput = {this.inputEmail.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Phone"
                                            type="tel"
                                            fullWidth
                                            errorText = {this.state.phoneError ? "Номер телефона должен содержать 11 символов" : ""}
                                            defaultValue={this.props.client.client_phone || ""}
                                            onInput = {this.inputPhone.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Name"
                                            type="text"
                                            fullWidth
                                            defaultValue={this.props.client.client_name || ""}
                                            onInput = {this.inputName.bind(this)}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            <RaisedButton label="Сохранить" onClick = {this.send.bind(this)} secondary />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    client: state.app.get("client") ?
        state.app.get("client").toJS() :
        false
}), {updateClientInformation, getClient, push})(EditClient);

