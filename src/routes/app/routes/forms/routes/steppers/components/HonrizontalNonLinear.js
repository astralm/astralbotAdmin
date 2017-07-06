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
            check2: [false, false, false, false, false, false, false],
        }

        this.days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        this.days2 = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        this.time = ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16']
        this.time2 = ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16']
    }

    handleChange (id) {
        this.setState( prev => {
            let check = [...prev.check];
            console.log(check);
            check[id] = !check[id];
            return {check}
        })
    }
    handleChange2(id) {
        this.setState( prev => {
            let check = [...prev.check2];
            console.log(check);
            check[id] = !check[id];
            return {check2: check}

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

                <div key={i}><br/>
                    <Checkbox onClick={() => this.handleChange(i)} label={el}   />
                    <div>{this.state.check[i] ? this.time[i] : ''}</div>
                </div>
                ))}
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
                {this.days2.map( (el, i) => (
                    <div key={i}><br/>
                        <Checkbox onClick={() => this.handleChange2(i)} label={el}   />
                        <div>{this.state.check2[i] ? this.time2[i] : ''}</div>
                    </div>
                ))}
              <SliderExampleControlled title="Указать оклад" min={0} max={100000} step={100} />
              <SliderExampleControlled title="Указать ставку в рублях за 1 час" min={10} max={1000} step={10}/>
                ma<SelectFieldExampleNullable title="Ставка" primarySts={[18,20,36,40]}/>
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
