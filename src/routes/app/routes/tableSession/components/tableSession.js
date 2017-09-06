import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import { getSessions, setFilter, setOffset, setOrder, setViewSession, bindSession, unbindSession } from '../../../../../actions/index.js';
class TableBody2 extends React.Component {
    setViewSession(session_id){
        this.props.setViewSession(session_id);
        if(session_id)
            this.props.router.push("app/dialog");
    }
    bindSession(session_id){
        this.props.bindSession(this.props.userId, session_id);
    }
    unbindSession(session_id){
        this.props.unbindSession(this.props.userId, session_id);
    }
    setFilter(options){
        this.props.setFilter(options.filter || false, options.hasOwnProperty("offset") ? options.offset : this.props.offset, options.order || this.props.order);
    }
    componentWillMount(){
        this.props.getSessions(this.props.filters || false, this.props.order || null, this.props.offset || 0);
    }
    render() {
        return (
            <div>
                <article className="article">
                    <div className="col-md-12">
                        <Table height="500" fixedHeader={true} fixedFooter={true} selectable={false} multiSelectable={false}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                                <TableRow>
                                    <TableHeaderColumn colSpan = "7"> 
                                        <RaisedButton label="активные" secondary = {this.props.filters.indexOf("active") > -1 ? true : false} onClick = {this.setFilter.bind(this, {offset: 0, filter:"active"})}/>
                                        <RaisedButton label="не активные" secondary = {this.props.filters.indexOf("inactive") > -1 ? true : false} onClick = {this.setFilter.bind(this, {offset: 0, filter:"inactive"})}/>
                                        <RaisedButton label="ошибки" secondary = {this.props.filters.indexOf("error") > -1 ? true : false} onClick = {this.setFilter.bind(this, {offset: 0, filter:"error"})}/>
                                        <RaisedButton label="без ошибок" secondary = {this.props.filters.indexOf("success") > -1 ? true : false} onClick = {this.setFilter.bind(this, {offset: 0, filter:"success"})}/>
                                        <RaisedButton label="свободные" disabled = {this.props.filters.indexOf('user') > -1 ? true : false} secondary = {this.props.filters.indexOf("free") > -1 ? true : false} onClick = {this.setFilter.bind(this, {offset: 0, filter:"free"})}/>
                                        <RaisedButton label="занятые" secondary = {this.props.filters.indexOf("busy") > -1 ? true : false} onClick = {this.setFilter.bind(this, {offset: 0, filter:"busy"})}/>
                                        <RaisedButton label="ваши" secondary = {this.props.filters.indexOf("user") > -1 ? true : false} onClick = {this.setFilter.bind(this, {offset: 0, filter:"user"})}/>
                                        <RaisedButton label="все" secondary = {this.props.filters.length > 0 || !this.props.filters ? false : true} onClick = {this.setFilter.bind(this, {offset: 0, filter:"all"})}/>
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn style = {{textAlign: "center"}}>
                                        <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_id", desc: this.props.order.name == "session_id" ? !this.props.order.desc : true}})} style={{cursor: "pointer"}}>
                                            ID
                                            {
                                                this.props.order.name == "session_id" ? 
                                                    this.props.order.desc ? 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                    null
                                            }
                                        </div>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn style = {{textAlign: "center"}}>
                                        <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "question", desc: this.props.order.name == "question" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                            ВОСПРОС
                                            {
                                                this.props.order.name == "question" ? 
                                                    this.props.order.desc ? 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                    null
                                            }
                                        </div>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn style = {{textAlign: "center"}}>
                                        <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "answer", desc: this.props.order.name == "answer" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                            ОТВЕТ
                                            {
                                                this.props.order.name == "answer" ? 
                                                    this.props.order.desc ? 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                    null
                                            }
                                        </div>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn style = {{textAlign: "center"}}>
                                        <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_status", desc: this.props.order.name == "session_status" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>
                                            СТАТУС
                                            {
                                                this.props.order.name == "session_status" ? 
                                                    this.props.order.desc ? 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                    null
                                            }
                                        </div>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn style = {{textAlign: "center"}}>
                                        <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "user_name", desc: this.props.order.name == "user_name" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                            КОНСУЛЬТАНТ
                                            {
                                                this.props.order.name == "user_name" ? 
                                                    this.props.order.desc ? 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                    null
                                            }
                                        </div>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn style = {{textAlign: "center"}}>
                                        <div onClick = {this.setFilter.bind(this, {offset: 0, order: {name: "session_error", desc: this.props.order.name == "session_error" ? !this.props.order.desc : false}})} style={{cursor: "pointer"}}>    
                                            ОШИБКА
                                            {
                                                this.props.order.name == "session_error" ? 
                                                    this.props.order.desc ? 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> : 
                                                        <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> : 
                                                    null
                                            }
                                        </div>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn style = {{textAlign: "center"}}>VIEW</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false} stripedRows={false} showRowHover={true} preScanRows={true}>
                                {
                                    this.props.sessions.map((session, sessionKey) => (
                                        <TableRow key = {sessionKey}>
                                            <TableRowColumn className="numeric" style={{textAlign:"center"}}>{ session.session_id }</TableRowColumn>
                                            <TableRowColumn className="numeric" title={session.question}>{ session.question }</TableRowColumn>
                                            <TableRowColumn className="numeric" title={session.answer}>{ session.answer }</TableRowColumn>
                                            <TableRowColumn className="numeric" style = {{textAlign: "center"}}>{ 
                                                    session.session_status ? 
                                                        <i className="material-icons" style={{color: "#4CAF50"}}>brightness_1</i> : 
                                                        <i className="material-icons" style={{color: "#EF6C00"}}>brightness_1</i> 
                                            }</TableRowColumn>
                                            <TableRowColumn className="numeric" style = {{textAlign: "center"}}>{ 
                                                session.user_name ?
                                                    session.user_name == this.props.user_name ?
                                                        <i className="material-icons" style = {{color: "#EF6C00", cursor: "pointer"}} onClick = {this.unbindSession.bind(this, session.session_id)}>remove_circle_outline</i> :
                                                        session.user_name :
                                                    <i className="material-icons" style = {{color: "#4CAF50", cursor: "pointer"}} onClick = {this.bindSession.bind(this, session.session_id)}>add_circle_outline</i>
                                            }</TableRowColumn>
                                            <TableRowColumn className="numeric" style = {{textAlign: "center"}}>{ 
                                                session.session_error ? 
                                                    <i className="material-icons" style={{color: "#EF6C00"}}>info_outline</i> : 
                                                    <i className="material-icons" style={{color: "#9E9E9E"}}>close</i>
                                            }</TableRowColumn>
                                            <TableRowColumn className="numeric" style = {{textAlign: "center"}}>
                                                <i className="material-icons" onClick = { this.setViewSession.bind(this, session.session_id) } style={{color: session.session_id != this.props.session_id ? "#9E9E9E" : "#4CAF50", cursor: "pointer"}}>remove_red_eye</i>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            <TableFooter adjustForCheckbox={false}>
                                <TableRow style={{verticalAlign:"middle"}}>
                                    <TableRowColumn colSpan = "7">
                                        {this.props.offset >= 50 ? <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.offset - 50})}><i className="material-icons">keyboard_arrow_left</i></IconButton> : null}
                                        <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {this.props.offset} по {+this.props.offset+this.props.sessions.length}</span>
                                        {this.props.sessions.length < 50 ? null : <IconButton onClick = {this.setFilter.bind(this, {offset: +this.props.offset + 50})}><i className="material-icons">keyboard_arrow_right</i></IconButton>}
                                    </TableRowColumn>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </article>
            </div>
        );
    }
}
module.exports = connect(state => ({
    sessions: state.app.get('sessions') ? state.app.get('sessions').toJS() : [],
    userId: state.app.getIn(['user', 'id']),
    user_name: state.app.getIn(['user', 'name']),
    filters: state.app.get('filters') ? state.app.get('filters').toJS() : [],
    offset: state.app.get('offset') || 0,
    order: state.app.get('order') ? state.app.get('order').toJS() : {
        name: "session_id",
        desc: true
    },
    session_id: state.app.getIn(['session', 'session_id'])
}), { getSessions, setFilter, setOffset, setOrder, setViewSession, bindSession, unbindSession })(TableBody2);