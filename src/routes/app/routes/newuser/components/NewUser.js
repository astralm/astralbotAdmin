import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { push } from 'react-router-redux';
class NewUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            name: "",
            organization_id: this.props.state.organization.organization_id
        };
    }
    componentDidUpdate(){
        !this.state.organization_id && this.setState({
            organization_id: this.props.state.organization.organization_id
        });
    }
    setUser(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "newUser",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.email,
                    this.state.name,
                    this.state.organization_id
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
                                            floatingLabelText="Email"
                                            fullWidth
                                            errorText = {!/.*@.*\.[aA-zZ].*/.test(this.state.email) && "Email должен быть вида 'simple@email.ru'"}
                                            onInput = {e => {this.setState({email: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Name"
                                            type="text"
                                            fullWidth
                                            errorText = {!this.state.name && "Имя не должно быть пустым"}
                                            onInput = {e => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    {
                                        this.props.state.organization && this.props.state.organization.type_id == 3 ?
                                            <div className="form-group">
                                                <SelectField
                                                  floatingLabelText="Организация"
                                                  value={this.state.organization_id}
                                                  onChange={(e, key, value) => {this.setState({organization_id: value})}}
                                                >
                                                    {
                                                        this.props.state.organizations && this.props.state.organizations.map((organization, key) => (
                                                            <MenuItem key={key} value={organization.organization_id} primaryText={organization.organization_name} />
                                                        ))
                                                    }
                                                </SelectField>
                                            </div> :
                                            ""
                                    }
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.state.name && /.*@.*\.[aA-zZ].*/.test(this.state.email) && <RaisedButton label="Зарегестрировать" onClick={this.setUser.bind(this)} secondary />
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
}))(NewUser);


