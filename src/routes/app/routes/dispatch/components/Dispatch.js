import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {newDispatch, deleteDispatch, getDispatches} from '../../../../../actions/index.js'; 
class Dispatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            telegram: true,
            widget: true,
            dispatch_message: ""
        }
    }
    componentWillMount(){
        this.props.getDispatches();
    }
    delete(dispatch_id){
        this.props.deleteDispatch(dispatch_id);
    }
    newDispatch(){
        this.props.newDispatch(this.state.dispatch_message, this.state.telegram, this.state.widget);
    }
    change(obj, text){
        this.setState({
            dispatch_message: text
        });
    }
    widget(){
        this.setState({
            widget: !this.state.widget
        });
    }
    telegram(){
        this.setState({
            telegram: !this.state.telegram
        });
    }
    render(){
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card style={{marginBottom: "10px"}}>
                <CardHeader title="Новое сообщение" actAsExpander={this.props.dispatches.length > 0 ? true : false} showExpandableButton={this.props.dispatches.length > 0 ? true : false}/>
                <CardText expandable={this.props.dispatches.length > 0 ? true : false}>
                    <RaisedButton label="Telegram" style={{marginRight: "10px"}} secondary={this.state.telegram} onClick={this.telegram.bind(this)} disabled={!this.state.widget && this.state.telegram ? true : false} disabledBackgroundColor="#4CAF50" disabledLabelColor="#fff"/>
                    <RaisedButton label="Widget" secondary={this.state.widget} onClick={this.widget.bind(this)} disabled={!this.state.telegram && this.state.widget ? true : false} disabledBackgroundColor="#4CAF50" disabledLabelColor="#fff"/>
                    <TextField multiLine={true} fullWidth={true} floatingLabelText="Введите текст сообщения для рассылки" onChange={this.change.bind(this)}/>
                    <RaisedButton label="Отправить" secondary={true} disabled={!this.state.dispatch_message ? true : false} onClick={this.newDispatch.bind(this)}/>
                </CardText>
            </Card>
            {
                this.props.dispatches.map((item, key) => (
                    <Card key = {key}>
                        <CardHeader title={item.user_name} subtitle={item.dispatch_date_formated + " для " + [(+item.dispatch_telegram ? "Telegram" : false), (+item.dispatch_widget ? "Widget" : false)].filter(platform => {return typeof platform == "string"}).join(" и ")} actAsExpander={true} showExpandableButton={true} />
                        <CardText expandable={true}>
                            { item.dispatch_message }
                        </CardText>
                        <CardActions expandable={true}>
                            <FlatButton label="Удалить" style={{color: "#F44336"}} onClick={this.delete.bind(this, item.dispatch_id)}/>
                        </CardActions>
                    </Card>
                ))
            }
        </Paper>
    }
}

module.exports = connect(state => ({
    dispatches: state.app.get('dispatches') ? state.app.get('dispatches').toJS() : []
}), {newDispatch, deleteDispatch, getDispatches})(Dispatch);