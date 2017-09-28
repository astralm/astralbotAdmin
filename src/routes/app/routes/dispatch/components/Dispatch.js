import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
class Dispatch extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card>
                <CardHeader title="Новое сообщение" actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                    <RaisedButton label="Telegram" style={{marginRight: "10px"}} secondary/>
                    <RaisedButton label="Widget"/>
                    <TextField multiLine={true} fullWidth={true} floatingLabelText="Введите текст сообщения для рассылки"/>
                    <RaisedButton label="Отправить" secondary={true} disabled/>
                </CardText>
            </Card>
            <Card style={{marginTop: "10px"}}>
                <CardHeader title="Сергей" subtitle="12.03.12 43:12 для Widget и Telegram" actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                    text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text  text text 
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="Удалить" style={{color: "#F44336"}}/>
                </CardActions>
            </Card>
        </Paper>
    }
}

module.exports = Dispatch;