import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { push } from 'react-router-redux';
class NewOrganization extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            root: false,
            site: "",
            name: ""
        };
    }
    componentWillMount(){
        this.props.state.organization && !this.props.state.organization.type_id == 3 && this.props.dispatch(push("/404"));
    }
    createOrganization() {
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "newOrganization",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash,
                    this.state.name,
                    this.state.site,
                    this.state.root  
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
                                            floatingLabelText="Имя"
                                            fullWidth
                                            errorText = {!this.state.name && "Поле должно быть заполнено"}
                                            onInput = {(e) => {this.setState({name: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            floatingLabelText="Сайт"
                                            type="text"
                                            fullWidth
                                            errorText = {!/(http|https):\/\/.*\...*/.test(this.state.site) && "Сайт должен быть вида [http или https]://site.ru"}
                                            onInput = {(e) => {this.setState({site: e.target.value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Checkbox label="Все права" checked={this.state.root} onCheck={() => {this.setState({root: !this.state.root})}}/>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-center">
                            <RaisedButton label="Зарегестрировать" onClick={this.createOrganization.bind(this)} secondary disabled={
                                !/(http|https):\/\/.*\...*/.test(this.state.site) ?
                                    true :
                                    !this.state.name ?
                                    true :
                                    false
                            }/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(NewOrganization);


