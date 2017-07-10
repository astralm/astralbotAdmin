import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


class DialogSimple extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const style = {
            paddingTop: '20px;',
            paddingBottom: '20px;'
        }
        return (
            <div>
                <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                    <table className="mdl-data-table">
                        <thead>
                        <tr>
                            <th className="numeric" style={{style}}>ID SESSION</th>
                            <th className="numeric" style={{style}}>Администратор : Нет</th>
                            <th className="numeric" style={{style}}>Ошибка : Нет</th>
                            <th className="numeric" style={{style}}>Статус : Активна </th>
                            <th className="numeric" style={{style}}><RaisedButton label="Взять" secondary /></th>
                            <th className="numeric" style={{style}}><RaisedButton label="Отказаться" secondary /></th>
                        </tr>
                        </thead>

                    </table>
                </div>
                <div className="ui-timline-container">
                    <section className="ui-timeline">
                        <article className="tl-item alt">
                            <div className="tl-body">
                                <div className="tl-entry">
                                    <div className="tl-time">1 hour ago</div>
                                    <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-warning"><i className="material-icons">shopping_cart</i></div>
                                    <div className="tl-content">
                                        <h4 className="tl-tile text-danger">Клиент $NAME$</h4>
                                        <p>Клиент $VOPROS$</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className="tl-item">
                            <div className="tl-body">
                                <div className="tl-entry">
                                    <div className="tl-time">3 hours ago</div>
                                    <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-success"><i className="material-icons">camera</i></div>
                                    <div className="tl-content">
                                        <h4 className="tl-tile text-warning">Администратор $NAME$</h4>
                                        <p>Администратор $OTVET$</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className="tl-item alt">
                            <div className="tl-body">
                                <div className="tl-entry">
                                    <div className="tl-time">1 hour ago</div>
                                    <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-warning"><i className="material-icons">shopping_cart</i></div>
                                    <div className="tl-content">
                                        <h4 className="tl-tile text-danger">Клиент $NAME$</h4>
                                        <p>Клиент $VOPROS$</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className="tl-item">
                            <div className="tl-body">
                                <div className="tl-entry">
                                    <div className="tl-time">3 hours ago</div>
                                    <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-success"><i className="material-icons">camera</i></div>
                                    <div className="tl-content">
                                        <h4 className="tl-tile text-warning">Администратор $NAME$</h4>
                                        <p>Администратор $OTVET$</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        );
    }
}
module.exports = DialogSimple;

