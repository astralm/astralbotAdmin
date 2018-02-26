import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {push} from 'react-router-redux';
class TableOrganizations extends React.Component {    
    setFilter(options){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setOrganizationsFilter",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    JSON.stringify(options)
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
    componentWillMount(){
    	this.props.state.organization && !this.props.state.organization.type_id == 3 && this.props.dispatch(push("/404"));
    }
    render() {
        return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <Card style={{marginBottom: "10px"}}>
                <CardHeader title="Фильтрация" children={<RaisedButton label="Добавить новую" primary onClick={this.goTo.bind(this, {page_id: 18})}/>} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true} style={{overflow: "auto"}}>
                    <div style={{display: "inline-block", width: "50%", verticalAlign: "top"}}>
                        <Checkbox label="Полный доступ" 
                            checked = {
                                this.props.state.organizationsFilters && 
                                this.props.state.organizationsFilters.filters && 
                                this.props.state.organizationsFilters.filters.indexOf("root") > -1
                            }
                            onCheck = {this.setFilter.bind(this, {name: "root"})}
                        />
                        <Checkbox label="Не полный доступ" 
                            checked = {
                                this.props.state.organizationsFilters && 
                                this.props.state.organizationsFilters.filters && 
                                this.props.state.organizationsFilters.filters.indexOf("user") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "user"})}
                        />
                        <Checkbox label="Все" 
                            checked = {
                                this.props.state.organizationsFilters && 
                                this.props.state.organizationsFilters.filters && 
                                this.props.state.organizationsFilters.filters.indexOf("all") > -1 &&
                                true || false
                            }
                            onCheck = {this.setFilter.bind(this, {name: "all"})}
                        />
                    </div>
                </CardText>
            </Card>
            <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                <table className="mdl-data-table table-bordered table-striped cf no-margin">
                    <thead className="cf">
                        <tr>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "organization_id", desc: this.props.state.organizationsFilters && this.props.state.organizationsFilters.order != "organization_id" && 1 || this.props.state.organizationsFilters && this.props.state.organizationsFilters.desc == 1 ? 0 : 1})}>
                                    <span style={{borderBottom: "1px dashed"}}>ID</span>
                                    {
                                        this.props.state.organizationsFilters && this.props.state.organizationsFilters.order == "organization_id" ?
                                            this.props.state.organizationsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "organization_name", desc: this.props.state.organizationsFilters && this.props.state.organizationsFilters.order != "organization_name" && 1 || this.props.state.organizationsFilters && this.props.state.organizationsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ИМЯ</span>
                                    {
                                        this.props.state.organizationsFilters && this.props.state.organizationsFilters.order == "organization_name" ?
                                            this.props.state.organizationsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "organization_site", desc: this.props.state.organizationsFilters && this.props.state.organizationsFilters.order != "organization_site" && 1 || this.props.state.organizationsFilters && this.props.state.organizationsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>САЙТ</span>
                                    {
                                        this.props.state.organizationsFilters && this.props.state.organizationsFilters.order == "organization_site" ?
                                            this.props.state.organizationsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                                <div style={{cursor: "pointer"}} onClick = {this.setFilter.bind(this, {order: "type_id", desc: this.props.state.organizationsFilters && this.props.state.organizationsFilters.order != "type_id" && 1 || this.props.state.organizationsFilters && this.props.state.organizationsFilters.desc == 1 ? 0 : 1})}>    
                                    <span style={{borderBottom: "1px dashed"}}>ПОЛНЫЙ ДОСТУП</span>
                                    {
                                        this.props.state.organizationsFilters && this.props.state.organizationsFilters.order == "type_id" ?
                                            this.props.state.organizationsFilters.desc ?
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_up</i> :
                                                <i className="material-icons" style={{verticalAlign: "middle"}}>keyboard_arrow_down</i> :
                                            null 
                                    }
                                </div>
                            </th>
                            <th>
                              <span>ПОДРОБНЕЕ</span>
                            </th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            this.props.state.organizations && this.props.state.organizations.map((organization, key) => (
                                <tr key = {key}>
                                    <td className="numeric">{ organization.organization_id || "—" }</td>
                                    <td className="numeric">{ organization.organization_name || "—"}</td>
                                    <td className="numeric">{ <a href={organization.organization_site}>{organization.organization_site || "—"}</a>}</td>
                                    <td className="numeric">{ organization.type_id == 3 ? "Да" : "Нет"}</td>
                                    <td className="numeric">
                                    	<i className="material-icons" onClick = {this.goTo.bind(this, {page_id: 20, item_id: organization.organization_id})} style={{color: organization.organization_id != (this.props.state.viewOrganization && this.props.state.viewOrganization.organization_id || 0) ? "#9E9E9E" : "#4CAF50", cursor: "pointer"}}>remove_red_eye</i>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr style={{verticalAlign:"middle"}}>
                            <td colSpan = "11">
                                {
                                   (this.props.state.organizationsFilters && this.props.state.organizationsFilters.offset) >= (this.props.state.organizationsFilters && this.props.state.organizationsFilters.limit) ? 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.organizationsFilters && +this.props.state.organizationsFilters.offset) - (this.props.state.organizationsFilters && +this.props.state.organizationsFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton> : 
                                        null
                                }
                                <span style={{display: 'inline-block', height: '48px', lineHeight: '48px', verticalAlign: 'top'}}>записи с {(this.props.state.organizationsFilters && this.props.state.organizationsFilters.offset) || 0} по {(this.props.state.organizationsFilters && +this.props.state.organizationsFilters.offset) || 0 + (this.props.state.organizations && +this.props.state.organizations.length) || 0}</span>
                                {
                                    (this.props.state.organizations && this.props.state.organizations.length) < (this.props.state.organizationsFilters && this.props.state.organizationsFilters.limit) ? 
                                        null : 
                                        <IconButton onClick = {this.setFilter.bind(this, {offset: (this.props.state.organizationsFilters && +this.props.state.organizationsFilters.offset) + (this.props.state.organizationsFilters && +this.props.state.organizationsFilters.limit)})}>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </IconButton>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Paper>
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(TableOrganizations);