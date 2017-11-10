import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { updateOrganizationInformation, getOrganization } from '../../../../../actions/index.js';
import { push } from 'react-router-redux';
class EditOrganization extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.organization.organization_name || "",
            site: this.props.organization.organization_site || "",
            root: this.props.organization.organization_root ? true : false,
        };
    }
    componentWillMount(){
        if(this.props.organization){
            this.props.getOrganization(this.props.organization.organization_id);
        }
    }
    inputName(e){
        this.setState({
            name: e.target.value
        });
    }
    inputSite(e){
        this.setState({
            site: e.target.value
        });
    }
    inputRoot(){
        this.setState({
            root: !this.state.root
        });
    }
    send(){
        let [name, site, rootValue] = [this.state.name, this.state.site, this.state.root ? 1 : 0];
        let result = {
            organization_id: this.props.organization.organization_id
        };
        if(name && name != this.props.organization.organization_name){
            result.organization_name = name;
        }
        if(site && site != this.props.organization.organization_site){
            result.organization_site = site;
        }
        if(typeof rootValue == "number" && rootValue != this.props.organization.organization_root){
            result.organization_root = rootValue;
        }
        if(Object.keys(result).length > 1){
            this.props.updateOrganizationInformation(result);
            this.props.push("/app/organization");
        }
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
                                            defaultValue = {this.props.organization.organization_name || ""}
                                            onInput = {this.inputName.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Сайт"
                                            type="text"
                                            fullWidth
                                            defaultValue={this.props.organization.organization_site || ""}
                                            onInput = {this.inputSite.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Checkbox label="Все права" checked={this.state.root} onCheck={this.inputRoot.bind(this)}/>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            <RaisedButton label="Сохранить" onClick = {this.send.bind(this)} secondary />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    organization: state.app.get("organization") ?
        state.app.get("organization").toJS() :
        false
}), {updateOrganizationInformation, getOrganization, push})(EditOrganization);

