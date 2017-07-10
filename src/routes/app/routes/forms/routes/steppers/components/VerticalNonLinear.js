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
const styles = {
    checkbox: {
        maxWidth: 250
    }
};
class VerticalNonLinear extends React.Component {

  state = {
    stepIndex: 0,
  };

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

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
                />
        {step > 0 && (
        <FlatButton
          label="Back"
          disableTouchRipple
          disableFocusRipple
          onTouchTap={this.handlePrev}
                    />
                )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.props;

    return (
      <article className="article">
        <div className="box box-default">
          <div className="box-body ">
            <div>
            {/*<div style={{maxWidth: 380, height: 400, margin: 'auto'}}>*/}
              <Stepper
                activeStep={stepIndex}
                linear={false}
                orientation="vertical"
              >
                <Step>
                  <StepButton >
                    Контактная информация
                  </StepButton>
                  <StepContent>

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
                    <SliderExampleControlled/>

                  </StepContent>
                </Step>
                <Step>
                  <StepButton >
                    Рабочее время и зарплата
                  </StepButton>
                  <StepContent>
                     <p><b>Указать дни недели рабочие + часы работы в эти дни : </b></p>
                    <Checkbox
                      label="ПНД"
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
                    /><br/>

                  </StepContent>
                </Step>
                <Step>
                  <StepButton >
                    Дополнительная ставка
                  </StepButton>
                  <StepContent>
                    <p>
                    Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.
                  </p>

                  </StepContent>
                </Step>
              </Stepper>
            </div>


          </div>
        </div>
      </article>
    );
  }
}

export default VerticalNonLinear;
