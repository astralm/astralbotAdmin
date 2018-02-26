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
class NewEntities extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            bot_id: this.props.params && this.props.params.id && parseInt(this.props.params.id.replace(":", "")),
            entities: [[]],
            group_id: 0
        };
    }
    createEntities() {
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "newEntities",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.bot_id,
                    this.state.group_id > 0 ? this.state.group_id : null,
                    this.state.name,
                    JSON.stringify(this.state.entities)
                ]
            }
        });
    }
    goTo(props){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "changePage",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    props.page_id,
                    props.item_id || 0
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
                                            fullWidth
                                            errorText = {!this.state.name && "Поле должно быть заполнено"}
                                            onInput = {(e) => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    <SelectField
                                        floatingLabelText="Бот"
                                        value={this.state.bot_id}
                                        onChange={(e,i,value) => {
                                            this.goTo({page_id: 34, item_id: value});
                                            this.setState({
                                                bot_id: value,
                                                entities: [[]]
                                            });
                                        }}
                                        errorText={!this.state.bot_id && "Должен быть выбран бот"}
                                    >
                                        {
                                            this.props.state.bots.map((bot, key) => (
                                                <MenuItem 
                                                    value={bot.bot_id} 
                                                    key={key} 
                                                    primaryText={bot.bot_name}
                                                />
                                            ))
                                        }
                                    </SelectField>
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
                                            this.props.state.entitiesGroups && this.props.state.entitiesGroups.map((group, key)=>(
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
                                        this.state.entities.map((condition, entitiesKey) => (
                                            <div 
                                                key = {entitiesKey}
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
                                                                    let entities = this.state.entities,
                                                                        entity = entities[entitiesKey];
                                                                    entity.splice(entityKey, 1);
                                                                    entity.length > 0 ? 
                                                                        (entities[entitiesKey] = entity) :
                                                                        entities.splice(entitiesKey, 1);
                                                                    entities.length == 0 && (entities = [[]]);
                                                                    this.setState({
                                                                        entities: entities
                                                                    })
                                                                }}
                                                                style = {{display: "inline-block", margin: "4px"}}
                                                                labelStyle = {{verticalAlign: "text-bottom"}}
                                                            >
                                                                {entity}
                                                            </Chip>
                                                        ))
                                                    }
                                                </div>
                                                <TextField
                                                    floatingLabelText = "Cиноним"
                                                    style = {{
                                                        marginTop: "-21px",
                                                        width: "274px"
                                                    }}
                                                    value = {this.state[`s_${entitiesKey}`]}
                                                    onChange = {(e, value) => {
                                                        this.setState({[`s_${entitiesKey}`]: value});
                                                    }}
                                                    style = {{margin: "-12px 20px 0 0"}}
                                                    errorText={this.state.entities[entitiesKey].length == 0 && "Должено быть хотябы одно слово"}
                                                />
                                                <RaisedButton label = "Добавить синоним" primary onClick = {() => {
                                                    let entities = this.state.entities,
                                                        entity = entities[entitiesKey];
                                                    this.state.hasOwnProperty(`s_${entitiesKey}`) &&
                                                    this.state[`s_${entitiesKey}`].length > 0 &&
                                                    (entity.push(this.state[`s_${entitiesKey}`])) &&
                                                    (entities[entitiesKey] = entity) &&
                                                    this.setState({
                                                        entities: entities,
                                                        [`s_${entitiesKey}`]: ""
                                                    });
                                                }}/>
                                            </div>
                                        ))
                                    }
                                    {
                                        this.state.entities[this.state.entities.length - 1].length > 0 &&
                                        <RaisedButton 
                                            label = "Добавить строку"
                                            primary
                                            onClick = {() => {
                                                let entities = this.state.entities;
                                                entities.push([]);
                                                this.setState({
                                                    entities: entities
                                                });
                                            }}
                                        />
                                    }
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            {
                                this.state.name && 
                                this.state.bot_id > 0 && 
                                this.state.entities[this.state.entities.length - 1].length > 0 && 
                                <RaisedButton label="Создать новый синоним" onClick={this.createEntities.bind(this)} secondary />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(NewEntities);