import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {getOrganization, setViewOrganization} from './../../../../../actions/index.js';
import {push} from 'react-router-redux';
class Organization extends React.Component {
    componentWillMount(){
        if(this.props.organization){
            this.props.getOrganization(this.props.organization.organization_id);
            console.log(this.props.organization.organization_root);
            if(!this.props.organization.organization_root)
                this.props.push('404');
        }
    }
    edit(){
        this.props.push("/app/editOrganization");
    }
    render() {
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Организация</h4>
                                    <p>
                                        <strong>ID: </strong> {this.props.organization.organization_id} <br/>
                                        <strong>Название: </strong> {this.props.organization.organization_name} <br/>
                                        <strong>Сайт: </strong> <a href={this.props.organization.organization_site} target="_blank">{this.props.organization.organization_site}</a> <br/>
                                        <strong>Все права: </strong> {this.props.organization.organization_root ? "Да" : "Нет"} <br/>
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.edit.bind(this)}  secondary />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    }
}
module.exports = connect(state => ({
    organization: state.app.get("userOrganization") ?
        state.app.get("userOrganization").toJS() :
        false
}), {getOrganization, setViewOrganization, push})(Organization);