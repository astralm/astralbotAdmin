import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
class Organization extends React.Component {
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
                                        <strong>ID: </strong> {this.props.state.viewOrganization && this.props.state.viewOrganization.organization_id || "—"} <br/>
                                        <strong>Название: </strong> {this.props.state.viewOrganization && this.props.state.viewOrganization.organization_name || "—"} <br/>
                                        <strong>Сайт: </strong> <a href={this.props.state.viewOrganization && this.props.state.viewOrganization.organization_site} target="_blank">{this.props.state.viewOrganization && this.props.state.viewOrganization.organization_site}</a> <br/>
                                        <strong>Все права: </strong> {this.props.state.viewOrganization && this.props.state.viewOrganization.type_id == 3 ? "Да" : "Нет"} <br/>
                                    </p>
                                    <RaisedButton label="Редактировать" onClick = {this.goTo.bind(this, {page_id: 21, item_id: this.props.state.viewOrganization && this.props.state.viewOrganization.organization_id})}  secondary />
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
}))(Organization);