import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            h1_zag : 'Добавить нового пользователя'
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
                                            onInput = {this.inputEmail}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Password"
                                            type="password"
                                            fullWidth
                                            onInput = {this.inputPassword}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Name"
                                            type="text"
                                            fullWidth
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            <RaisedButton label="Зарегестрировать" href='#/app/administrators'  secondary />

                        </div>
                    </div>


                </div>
            </div>
        );
    }
}
module.exports = NewUser;

