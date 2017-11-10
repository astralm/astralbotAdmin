import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { setUser, getOrganizations } from '../../../../../actions/index.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class NewUser extends React.Component {
    componentWillMount(){
        this.props.getOrganizations();
    }
    constructor(props){
        super(props);
        this.state = {
            organization_id: this.props.organization_id
        };
    }
    email(e){
        this.setState({email: e.target.value});
    }
    password(e){
        this.setState({password:e.target.value});
    }
    name(e){
        this.setState({name: e.target.value});
    }
    changeOrganization(obj, key, payload){
        this.setState({
            organization_id: payload
        });
    }
    setUser () {
        let state = this.state,
            [email, password, name, organization] = [state.email, state.password, state.name, state.organization_id];
        if(/[aA-zZ]*@[aA-zZ]*\.[aA-zZ]/.test(email) && password && /[aA-zZаА-яЯ]*/.test(name))
            this.props.setUser(email, password, name, organization);
    }
    render() {
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.name = this.name.bind(this);
        this.setUser = this.setUser.bind(this);
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
                                            onInput = {this.email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Password"
                                            type="password"
                                            fullWidth
                                            onInput = {this.password}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Name"
                                            type="text"
                                            fullWidth
                                            onInput = {this.name}
                                        />
                                    </div>
                                    {
                                        this.props.organization_root ?
                                            <div className="form-group">
                                                <SelectField
                                                  floatingLabelText="Организация"
                                                  value={this.state.organization_id}
                                                  onChange={this.changeOrganization.bind(this)}
                                                >
                                                    {
                                                        this.props.organizations.map((organization, key) => (
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
                            <RaisedButton label="Зарегестрировать" href='#/app/administrators' onClick={this.setUser} secondary />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    organizations: state.app.get('organizations') ?
        state.app.get('organizations').toJS() :
        [],
    organization_root: state.app.getIn(['userOrganization', 'organization_root']),
    organization_id: state.app.getIn(['userOrganization', 'organization_id'])
}), {setUser, getOrganizations})(NewUser);


