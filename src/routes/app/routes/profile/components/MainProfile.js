import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
class MainProfile extends React.Component {
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
        })
    }
    render() {
        return (
            <div>
                <article className="article article-dark">
                    <div className="container-fluid with-maxwidth">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="box box-transparent">
                                    <div className="box-body padding-lg-h">
                                        <h4>Ваш профиль</h4>
                                        <p style={{whiteSpace: "nowrap"}}>
                                            <strong>Почта:</strong> {this.props.state.user && this.props.state.user.email || "—"}
                                            <br />
                                            <strong>Имя:</strong> {this.props.state.user && this.props.state.user.name || "—"}
                                            <br />
                                            <strong>Организация:</strong> {
                                                this.props.state.organization && this.props.state.organization.type_id == 3 ?
                                                    <span onClick={this.goTo.bind(this, {page_id: 20, item_id: this.props.state.organization && this.props.state.organization.organization_id})} style={{borderBottom: "1px dashed #000", cursor: "pointer"}}>{this.props.state.organization.organization_name}</span>
                                                    : this.props.state.organization.organization_name
                                            }
                                            <br />
                                            <strong>Сайт организации:</strong> <a href={this.props.state.organization && this.props.state.organization.organization_site} target="_blank">{this.props.state.organization && this.props.state.organization.organization_site}</a><br/>
                                            <strong>Ключ для подписки на оповещения в telegram: </strong> 
                                                <input 
                                                    onClick={e => {e.target.select(); document.execCommand('copy');}} 
                                                    readOnly={true}
                                                    defaultValue={this.props.state.user && this.props.state.user.hash || "—"}
                                                    style={{width: "280px", textAlign: "center"}}
                                                /><br />
                                            <strong>Оповещения в телеграм:</strong> {this.props.state.user && this.props.state.user.telegram_notification ? "Включены" : "Выключены" || "—"}
                                        </p>
                                        <RaisedButton label="Редактировать" onClick={this.goTo.bind(this, {page_id: 14})}  secondary />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}
module.exports = connect(state => ({
    state: state.app.toJS()
}))(MainProfile);

