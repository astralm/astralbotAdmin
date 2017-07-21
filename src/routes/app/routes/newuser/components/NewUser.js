import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { setUsers } from '../../../../../actions/index.js';

class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            h1_zag : 'Добавить нового пользователя'
        }
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
    setUser () {
       this.props.getUsers(this.state.email,this.state.password,this.state.name)
    }

    render() {
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.name = this.name.bind(this);
        this.click = this.click.bind(this);
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
                                            onInput = {this.email()}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Password"
                                            type="password"
                                            fullWidth
                                            onInput = {this.password()}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Name"
                                            type="text"
                                            fullWidth
                                            onInput = {this.name()}
                                        />
                                    </div>
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
module.exports = connect(state => (null), {setUsers})(NewUser);


