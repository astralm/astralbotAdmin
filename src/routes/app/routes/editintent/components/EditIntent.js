import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { push } from 'react-router-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
class EditIntent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.state.intent ? this.props.state.intent.intent_name : "",
            conditions: this.props.state.intent && this.props.state.intent.conditions || [[]],
            group_id: this.props.state.intent ? this.props.state.intent.group_id : 0,
            answer: this.props.state.intent ? this.props.state.intent.answer_text : ""
        };
    }
    updateIntent() {
        let conditions = this.state.conditions.map(condition => condition.map(entities => entities.entities_id));
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "updateIntent",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.props.state.intent.intent_id,
                    this.state.group_id > 0 ? this.state.group_id : null,
                    this.state.name,
                    JSON.stringify(conditions),
                    this.state.answer 
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
                                            floatingLabelText="Название интента"
                                            fullWidth
                                            value={this.state.name}
                                            errorText = {!this.state.name && "Поле должно быть заполнено"}
                                            onInput = {(e) => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    <SelectField
                                        floatingLabelText="Группа"
                                        value={this.state.group_id}
                                        onChange={(e,i,value) => {
                                            this.setState({
                                                group_id: value
                                            })
                                        }}
                                    >
                                        {
                                            this.props.state.intentsGroups && this.props.state.intentsGroups.map((group, key)=>(
                                                <MenuItem 
                                                    key = {key}
                                                    value = {group.group_id}
                                                    primaryText = {group.group_name}
                                                />
                                            ))
                                        }
                                        <MenuItem 
                                            value = {0}
                                            primaryText = "Без группы"
                                        />
                                    </SelectField>
                                    {
                                        this.state.conditions.map((condition, conditionKey) => (
                                            <div 
                                                key = {conditionKey}
                                                style = {{
                                                    margin: "20px 0",
                                                    background: "#f7f7f7",
                                                    padding: "10px 20px",
                                                    borderRadius: "5px"
                                                }}
                                            >
                                                <div>
                                                    {
                                                        condition.map((entity, entityKey) => (
                                                            <Chip 
                                                                key={entityKey} 
                                                                onRequestDelete={()=>{
                                                                    let conditions = this.state.conditions,
                                                                        entities = conditions[conditionKey];
                                                                    entities.splice(entityKey, 1);
                                                                    entities.length > 0 ? 
                                                                        (conditions[conditionKey] = entities) :
                                                                        conditions.splice(conditionKey, 1);
                                                                    conditions.length == 0 && (conditions = [[]]);
                                                                    this.setState({
                                                                        conditions: conditions
                                                                    })
                                                                }}
                                                                style = {{display: "inline-block", margin: "4px"}}
                                                                labelStyle = {{verticalAlign: "text-bottom"}}
                                                            >
                                                                {entity.entities_name}
                                                            </Chip>
                                                        ))
                                                    }
                                                </div>
                                                <SelectField
                                                    floatingLabelText = "Добавить синонимы в условие"
                                                    onChange = {(e,k,value) => {
                                                        let conditions = this.state.conditions,
                                                            entities = conditions[conditionKey];
                                                        entities.push(value);
                                                        conditions[conditionKey] = entities;
                                                        this.setState({
                                                            conditions: conditions
                                                        });
                                                    }}
                                                    style = {{
                                                        marginTop: "-21px",
                                                        width: "274px"
                                                    }}
                                                    errorText={this.state.conditions[0].length == 0 && "Интент должен содержать условие."}
                                                >
                                                    {
                                                        this.props.state.entities && this.props.state.entities.map((entity, key) => (
                                                            <MenuItem 
                                                                key = {key}
                                                                primaryText = {entity.entities_name}
                                                                value = {{
                                                                    entities_id: entity.entities_id,
                                                                    entities_name: entity.entities_name
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </SelectField>
                                            </div>
                                        ))
                                    }
                                    {
                                        this.state.conditions[this.state.conditions.length - 1].length > 0 &&
                                        <RaisedButton 
                                            label = "Добавить условие"
                                            primary
                                            onClick = {() => {
                                                let conditions = this.state.conditions;
                                                conditions.push([]);
                                                this.setState({
                                                    conditions: conditions
                                                });
                                            }}
                                        />
                                    }
                                </fieldset>
                                <TextField 
                                    floatingLabelText = "Ответ бота на условия интента"
                                    multiLine={true}
                                    fullWidth={true}
                                    errorText={!this.state.answer && "Интент должен содержать ответ."}
                                    value={this.state.answer}
                                    onChange={(e, value)=>{this.setState({
                                        answer: value
                                    })}}
                                />
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.state.name && 
                                this.state.conditions[this.state.conditions.length - 1].length > 0 && 
                                this.state.answer && 
                                <RaisedButton label="Сохранить" onClick={this.updateIntent.bind(this)} secondary />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(EditIntent);