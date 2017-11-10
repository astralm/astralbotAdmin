import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { createOrganization } from '../../../../../actions/index.js';
import Checkbox from 'material-ui/Checkbox';
import { push } from 'react-router-redux';
class NewOrganization extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            root: false
        };
    }
    componentWillMount(){
        if(!this.props.organization_root)
            this.props.push('404');
    }
    name(e){
        this.setState({name: e.target.value});
    }
    site(e){
        this.setState({site:e.target.value});
    }
    root(){
        this.setState({root: !this.state.root});
    }
    createOrganization() {
        let state = this.state,
            [name, site, rootValue] = [state.name, state.site, state.root];
        if(name && site && typeof rootValue == "boolean"){
            this.props.createOrganization(name, site, rootValue ? 1 : 0);
            this.props.push('app/organizations');
        }
    }
    render() {
        this.name = this.name.bind(this);
        this.site = this.site.bind(this);
        this.root = this.root.bind(this);
        this.createOrganization = this.createOrganization.bind(this);
        return (
            <div>
                <div className="body-inner">
                    <div className="card bg-white">
                        <div className="card-content">
                            <form className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Имя"
                                            fullWidth
                                            onInput = {this.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Сайт"
                                            type="text"
                                            fullWidth
                                            onInput = {this.site}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Checkbox label="Все права" checked={this.state.root} onCheck={this.root}/>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            <RaisedButton label="Зарегестрировать" onClick={this.createOrganization} secondary />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    organization_root: state.app.getIn(['userOrganization', 'organization_root'])
}), {createOrganization, push})(NewOrganization);


