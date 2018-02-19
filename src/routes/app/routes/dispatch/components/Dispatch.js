import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
class Dispatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            telegram: false,
            widget: false,
            text: ""
        }
    }
    componentWillMount(){
        this.props.state.bots && this.props.state.bots.forEach(bot => {
            this.setState({
                [bot.bot_name]: false
            });
        });
    }
    delete(dispatch_id){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "deleteDispatch",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    dispatch_id
                ]
            }
        });
    }
    check(param){
        param != "all" ? this.setState({
            [param]: !this.state[param]
        }) : Object.keys(this.state).forEach(name => {
            name != "text" && this.setState({
                [name]: true
            });
        });
    }
    newDispatch(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "newDispatch",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.text,
                    JSON.stringify(["telegram", "widget"].filter(name => this.state[name]).map(name => name == "telegram" ? 5 : 1)),
                    JSON.stringify(Object.keys(this.state).filter(key => ["telegram", "widget", "text"].indexOf(key) == -1 && this.state[key]).map(key => this.props.state.bots.find(bot => bot.bot_name == key).bot_id))
                ]
            }
        })
    }
    render(){
        const style = {
            width: "200px",
            display: "inline-block",
            maxHeight: "135px",
            overflow: "auto",
            verticalAlign: "top"
        };
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card style={{marginBottom: "10px"}}>
                <CardHeader title="Новое сообщение" actAsExpander={this.props.state.dispatches && this.props.state.dispatches.length > 0 ? true : false} showExpandableButton={this.props.state.dispatches && this.props.state.dispatches.length > 0 ? true : false}/>
                <CardText expandable={this.props.state.dispatches && this.props.state.dispatches.length > 0 ? true : false}>
                    <div style={style}>   
                        <Checkbox label="Telegram" checked={this.state.telegram} onCheck={this.check.bind(this, "telegram")}/>
                        <Checkbox label="Виджет" checked={this.state.widget} onCheck={this.check.bind(this, "widget")}/>
                    </div>
                    <div style={style}>
                        {
                            this.props.state.bots && this.props.state.bots.map((bot, key)=>(
                                <Checkbox key={key} label={bot.bot_name} checked={this.state[bot.bot_name]} onCheck={this.check.bind(this, bot.bot_name)}/>
                            ))
                        }
                    </div>
                    <div style={style}>   
                        <RaisedButton label="Всем" primary onClick={this.check.bind(this, "all")}/>
                    </div>
                    <TextField 
                        fullWidth 
                        multiLine 
                        rowsMax={10} 
                        rows={3} 
                        floatingLabelText="Введите текст сообщения" 
                        errorText={!this.state.text && "Сообщение не может быть пустым"}
                        onInput={(e)=>{this.setState({
                            text: e.target.value
                        })}}
                    />
                    {
                        <RaisedButton label={"Отправить"} onClick = {this.newDispatch.bind(this)} primary disabled={
                            Object.keys(this.state).find(name => this.state[name] == true && name != "telegram" && name != "widget") == undefined ?
                                true : 
                                this.state.text ?
                                    (this.state.telegram || this.state.widget) ? 
                                        false : 
                                        true :
                                    true
                        }/>
                    }
                </CardText>
            </Card>
            {
                this.props.state.dispatches && this.props.state.dispatches.map((dispatch, key) => (
                    <Card key = {key}>
                        <CardHeader 
                            title={dispatch.user_name} 
                            subtitle={
                                dispatch.dispatch_date_create + 
                                " для " + 
                                [
                                    (+dispatch.types.indexOf(5) > -1 ? "Telegram" : false), 
                                    (+dispatch.types.indexOf(1) > -1 ? "Виджета" : false)
                                ].filter(platform => {return typeof platform == "string"}).join(" и ") +
                                 ". Направление: " +
                                dispatch.bots.map(bot => bot.bot_name).join(" и ")
                            } 
                            actAsExpander={true} 
                            showExpandableButton={true} 
                        />
                        <CardText expandable={true}>
                            { dispatch.dispatch_text }
                        </CardText>
                        <CardActions expandable={true}>
                            <FlatButton label="Удалить" style={{color: "#F44336"}} onClick={this.delete.bind(this, dispatch.dispatch_id)}/>
                        </CardActions>
                    </Card>
                ))
            }
        </Paper>
    }
}

module.exports = connect(state => ({
    state: state.app.toJS()
}))(Dispatch);