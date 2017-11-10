import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrganizations, setViewOrganization} from './../../../../../actions/index.js';
import {push} from 'react-router-redux';
import Paper from 'material-ui/Paper';
class Organizations extends Component {
	componentWillMount(){
		this.props.getOrganizations();
		if(!this.props.organization_root)
			this.props.push("404");
	}
	link(organization_id){
		this.props.setViewOrganization(organization_id);
		this.props.push('app/organization');
	}
	render(){
		return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
	        <div className="box box-default table-box table-responsive mdl-shadow--2dp">
	            <table className="mdl-data-table table-bordered table-striped cf no-margin">
	                <thead className="cf">
	                    <tr>
	                        <th>
	                          ID
	                        </th>
	                        <th>
	                          ИМЯ
	                        </th>
	                        <th>    
	                          САЙТ
	                        </th>
	                        <th>
	                          ПОЛНЫЙ ДОСТУП
	                        </th>
	                        <th>
	                          ПОДРОБНЕЕ
	                        </th>
	                    </tr>
	                </thead>
	                <tbody>
	                    {this.props.organizations.map((organization, key) => (
	                        <tr key={key}>
	                            <td>{organization.organization_id}</td>
	                            <td>{organization.organization_name}</td>
	                            <td><a href={organization.organization_site} target="_blank">{organization.organization_site}</a></td>
	                            <td>{organization.organization_root ? "Да" : "Нет"}</td>
	                            <td>
	                            	<i className="material-icons" 
                                  style={{
                                      color: organization.organization_id != this.props.organization_id ? 
                                          "#9E9E9E" : 
                                          "#4CAF50", 
                                      cursor: "pointer"
                                  }}
                                  onClick = {this.link.bind(this, organization.organization_id)}
                                >remove_red_eye</i>
                                </td>
	                        </tr>
	                    ))}
	                </tbody>
	            </table>
	        </div>
	    </Paper>
	}
}

module.exports = connect(state => ({
	organizations: state.app.get('organizations') ?
		state.app.get('organizations').toJS() :
		[],
	organization_id: state.app.getIn(['userOrganization', 'organization_id']),
	organization_root: state.app.getIn(["userOrganization", "organization_root"])
}), {
	getOrganizations,
	setViewOrganization,
	push
})(Organizations);