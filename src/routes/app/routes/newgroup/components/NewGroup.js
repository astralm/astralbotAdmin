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
            name: "",
            bot_id: this.props.params && this.props.params.id && parseInt(this.props.params.id.replace(":", "")),
            type_id: 6
        };
    }
    setGroup(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "newGroup",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.bot_id,
                    this.state.type_id,
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
                                            fullWidth
                                            errorText = {!this.state.name && "Название не должно быть пустым"}
                                            onInput = {e => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <SelectField
                                          floatingLabelText="Бот"
                                          value={this.state.bot_id}
                                          onChange={(e, key, value) => {this.setState({bot_id: value})}}
                                        >
                                            {
                                                this.props.state.bots && this.props.state.bots.map((bot, key) => (
                                                    <MenuItem key={key} value={bot.bot_id} primaryText={bot.bot_name} />
                                                ))
                                            }
                                        </SelectField>
                                    </div>
                                    <div className="form-group">
                                        <SelectField
                                            floatingLabelText="Тип"
                                            value={this.state.type_id}
                                            onChange={(e,key,value) => {this.setState({type_id: value})}}
                                        >
                                            <MenuItem value={6} primaryText="Интенты" />
                                            <MenuItem value={7} primaryText="Синонимы" />
                                        </SelectField>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.state.name && this.state.bot_id && this.state.type_id && <RaisedButton label="Создать группу" onClick={this.setGroup.bind(this)} secondary />
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


