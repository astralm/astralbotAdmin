import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import { connect } from 'react-redux';
import {} from '../../../../../actions/index.js';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {getClient, setViewSession} from './../../../../../actions/index.js';
import {push} from 'react-router-redux';
class Widget extends React.Component {
    copy(e){
        e.target.select();
        document.execCommand('copy');
    }
    render() {
        return <div>
            <article className="article article-dark">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="box box-transparent">
                                <div className="box-body padding-lg-h">
                                    <h4>Коды виджета для вставки</h4>
                                    <h5>Фак</h5>
                                    <input 
                                        type="text" 
                                        style={{width: "100%", marginTop: "10px", border: '1px solid #000', padding: "10px 15px"}} 
                                        onClick={this.copy.bind(this)}
                                        defaultValue={"<script src=\"widget.js\" id=\"widgetScript\" data-type=\"faq\" data-id=\""+this.props.organization_id+"\"></script>"}
                                        readOnly={true}
                                    />
                                    <h5>Продажа</h5>
                                    <input 
                                        type="text" 
                                        style={{width: "100%", marginTop: "10px", border: '1px solid #000', padding: "10px 15px"}} 
                                        onClick={this.copy.bind(this)}
                                        defaultValue={"<script src=\"widget.js\" id=\"widgetScript\" data-type=\"sale\" data-id=\""+this.props.organization_id+"\"></script>"}
                                        readOnly={true}
                                    />
                                    <h5>Партнеры</h5>
                                    <input 
                                        type="text" 
                                        style={{width: "100%", marginTop: "10px", border: '1px solid #000', padding: "10px 15px"}} 
                                        onClick={this.copy.bind(this)}
                                        defaultValue={"<script src=\"widget.js\" id=\"widgetScript\" data-type=\"partner\" data-id=\""+this.props.organization_id+"\"></script>"}
                                        readOnly={true}
                                    />
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
    organization_id: state.app.getIn(['userOrganization', 'organization_id'])
}), {getClient, setViewSession, push})(Widget);