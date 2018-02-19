import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
class EditGroup extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            name: this.props.state.group && this.props.state.group.group_name || ""
        }
    }
    updatreGroup(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "updateGroup",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.group.group_id,
                    this.state.name
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
                                            floatingLabelText="Название"
                                            type="text"
                                            errorText = {!this.state.name && "Название не должно быть пустым!"}
                                            fullWidth
                                            value={this.state.name}
                                            onInput = {e => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.state.name && <RaisedButton label="Сохранить" onClick = {this.updatreGroup.bind(this)} secondary />
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
}))(EditGroup);