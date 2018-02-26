import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {push} from 'react-router-redux';
class Widget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bot_id: 0
        }
    }
    copy(e){
        e.target.select();
        document.execCommand('copy');
    }
    widgets(){
        this.props.dispatch({
            type: "Query",
            middleware: true,
            data: {
                query: "setWidgetsState",
                values: [
                    this.props.state.user.hash,
                    this.props.state.socket.hash
                ]
            }
        })
    }
    render() {
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Код виджета для вставки</h4>
                                    {
                                        this.props.state.bots && 
                                        <SelectField
                                            floatingLabelText = "выберите бота"
                                            value = {this.state.bot_id}
                                            onChange = {(e,i,bot_id) => {this.setState({bot_id})}}
                                        >
                                            {
                                                this.props.state.bots.map((bot, key) => (
                                                    <MenuItem 
                                                        value = {key}
                                                        key = {key}
                                                        primaryText = {bot.bot_name}
                                                    />
                                                ))
                                            }
                                        </SelectField>
                                    }
                                    {
                                        this.props.state.bots && this.props.state.bots[this.state.bot_id] &&
                                        <input 
                                            type="text" 
                                            style={{width: "100%", marginTop: "10px", border: '1px solid #000', padding: "10px 15px"}} 
                                            onClick={this.copy.bind(this)}
                                            value={`<script src="https://astralbot.ru/widget/widget.js" id="widgetScript" data-b="${this.props.state.bots[this.state.bot_id].bot_hash}" data-o="${this.props.state.organization.organization_hash}"></script>`}
                                            readOnly={true}
                                        />
                                    }
                                    {
                                       this.props.state.bots && this.props.state.bots[this.state.bot_id] &&
                                       <RaisedButton 
                                        style={{marginTop: "30px"}} 
                                        secondary = {!this.props.state.organization.organization_widgets_work} 
                                        label = {this.props.state.organization.organization_widgets_work ? "Выключить виджеты" : "Включить виджеты"} 
                                        onClick = {this.widgets.bind(this)}
                                        /> 
                                    }
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
    state: state.app.toJS()
}))(Widget);