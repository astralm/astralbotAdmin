import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';
class MainProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            h1_zag : 'Ваш профиль'
        }
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
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur necessitatibus ea possimus est quis cumque vel saepe. Eum, quas, ducimus.</p>
                                        <div className="divider divider-solid" />
                                        <p>Поляков Сергей Викторович <br /> Веб-отдел <br /> Специалист тех. поддержки</p>
                                        <div className="divider divider-solid" />
                                        <p>
                                            <strong>Email:</strong> psv@astralnalog.ru
                                            <br />
                                            <strong>Phone:</strong> +7 999 9668008
                                            <br />
                                            <strong>Telegram:</strong> @sarboys_msk
                                        </p>
                                        <RaisedButton label="Редактировать" href='#/app/edituser'  secondary />
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
module.exports = MainProfile;

