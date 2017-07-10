import React from 'react';
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import SliderExampleControlled  from 'routes/app/routes/forms/routes/elements/components/Slider';
import SelectFieldExampleNullable  from 'routes/app/routes/forms/routes/elements/components/SelectField';
const styles = {
    checkbox: {
        maxWidth: 250
    }
};
const styleHeight = {
    heig : {
        overflowY: 'scroll',
        height:'580px',
        paddingLeft: '10px'
    }
};
/**
 * Non-linear steppers allow users to enter a multi-step flow at any point.
 *
 * This example is similiar to the regular horizontal stepper, except steps are no longer
 * automatically set to `disabled={true}` based on the `activeStep` prop.
 *
 * We've used the `<StepButton>` here to demonstrate clickable step labels.
 */


class HorizontalNonLinearStepper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stepIndex: 0,
            checkType: false,
            check: [false, false, false, false, false, false, false],
        }
        this.days = ['ПНД', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
            this.time = ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16']
    }

    handleChange = (id) => {
        this.setState( prev => {
            let check = [...prev.check];
            check[id] = !check[id];
            return {check}
        })
    }
    // this.setState(prev => ({ checkType: !prev.checkType }))
    // this.setState({ [e.target.name]: e.target.value });
    // checkboxClick(e) {
    //     this.setState({weekDay: e.target.label})
    //     console.log(this.state.weekDay);
    //     console.log(e.traget.label);
    // }
    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < 2) {
            this.setState({stepIndex: stepIndex + 1});
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    _renderStep0() {
        return (
            <div style={styleHeight.heig}>
                <TextField
                    hintText="ФИО"
                    floatingLabelText="Введите ФИО"
                /> <br/>
                <TextField
                    hintText="Должность"
                    floatingLabelText="Введите должность"
                /> <br/>
                <TextField
                    hintText="Телефон"
                    floatingLabelText="Введите телефон"
                />
                <br/>
                <TextField
                    hintText="Почта"
                    floatingLabelText="Введите email"
                />
                <br/>
                <TextField
                    hintText="Отдел"
                    floatingLabelText="Отдел"
                />
                <br/>

            </div>
        )
    }
    _renderStep1() {
        return (
            <div style={styleHeight.heig}>
                {this.days.map( (el, i) => (
                    <Checkbox onChange={() => this.handleChange(i)} label={el}  key={i} />,
                        <div>{this.state.check[i] ? 'инфа если прожали i-ый чекбокс' : 'инфа если не прожали'}</div>
                ))}

                {/*<p><b>Указать дни недели рабочие + часы работы в эти дни : </b></p>*/}
                {/*<div>*/}
                {/*<Checkbox onClick={this.checkboxClick} label="ПН" style={styles.checkbox}/>*/}
                {/*<div>{this.state.weekDay === 'ПН' ? '10:00 - 18:00' : ''}</div>*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<div>*/}
                {/*<Checkbox onClick={this.checkboxClick} label="ВТ" style={styles.checkbox}/>*/}
                {/*<div>{this.state.checkType ? '10:00 - 18:00' : ''}</div>*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<Checkbox*/}
                {/*label="СР"*/}
                {/*style={styles.checkbox}*/}
                {/*/><br/>*/}
                {/*<Checkbox*/}
                {/*label="ЧТ"*/}
                {/*style={styles.checkbox}*/}
                {/*/><br/>*/}
                {/*<Checkbox*/}
                {/*label="ПТ"*/}
                {/*style={styles.checkbox}*/}
                {/*/><br/>*/}
                {/*<Checkbox*/}
                {/*label="СБ"*/}
                {/*style={styles.checkbox}*/}
                {/*/><br/>*/}
                {/*<Checkbox*/}
                {/*label="ВС"*/}
                {/*style={styles.checkbox}*/}
                {/*/>*/}
                <SliderExampleControlled title="Указать оклад" min={0} max={100000} step={100} />
                <SliderExampleControlled title="Указать ставку в рублях за 1 час" min={10} max={1000} step={10}/>

                <SelectFieldExampleNullable title="Ставка" primarySts={[18,20,36,40]}/>
            </div>
        )
    }
    _renderStep2() {
        return (
            <div style={styleHeight.heig}>
                <SelectFieldExampleNullable title="Должность" primarySts={['Должность1','Должность2']} />
                <p><b>Указать дни недели рабочие + часы работы в эти дни : </b></p>
                <Checkbox
                    label="ПН"
                    style={styles.checkbox}
                /><br/>
                <Checkbox
                    label="ВТ"
                    style={styles.checkbox}
                /><br/>
                <Checkbox
                    label="СР"
                    style={styles.checkbox}
                /><br/>
                <Checkbox
                    label="ЧТ"
                    style={styles.checkbox}
                /><br/>
                <Checkbox
                    label="ПТ"
                    style={styles.checkbox}
                /><br/>
                <Checkbox
                    label="СБ"
                    style={styles.checkbox}
                /><br/>
                <Checkbox
                    label="ВС"
                    style={styles.checkbox}
                />
                <SliderExampleControlled title="Указать оклад" min={0} max={100000} step={100} />
                <SliderExampleControlled title="Указать ставку в рублях за 1 час" min={10} max={1000} step={10}/>

            </div>
        )
    }
    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return this._renderStep0();
            case 1:
                return this._renderStep1();
            case 2:
                return this._renderStep2();
            default:
                return '';
        }
    }

    render() {
        const {stepIndex} = this.props;
        const contentStyle = {margin: '0 16px'};

        return (
            <article className="article">
                <div className="box box-default">
                    <div className="box-body padding-xl">
                        <div>
                            <Stepper linear={false} activeStep={stepIndex} >
                                <Step>
                                    <StepButton >
                                        Контактная информация
                                    </StepButton>
                                </Step>
                                <Step>
                                    <StepButton >
                                        Рабочее время и зарплата
                                    </StepButton>
                                </Step>
                                <Step>
                                    <StepButton >
                                        Дополнительная ставка
                                    </StepButton>
                                </Step>
                            </Stepper>
                            <div style={styleHeight}>
                                {this.getStepContent(stepIndex)}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default HorizontalNonLinearStepper;
