// @flow
import React, { Component, PropTypes } from 'react';
import ReactSpinner from 'react-spinjs';
import { isEmpty, keys } from 'lodash';
import moment from 'moment';
import Header from './Header';
import Loader from './Loader';
import Checkbox from './Checkbox';
import CardContainer from './CardContainer';
import TextQuestion from './TextQuestion';
import NumericQuestion from './NumericQuestion';
import GraphicQuestion from './GraphicQuestion';
import styles from '../styles/Survey.css';


export default class Survey extends Component {
  static defaultProps = {
    surveyContent: {},
    userInput: [],
    anonymous: false
  }

  componentWillMount() {
    if (isEmpty(this.props.surveyContent)) {
      this.props.fetchSurvey();
    }
  }

  submit() {
    const userInput = this.props.userInput;
    this.props.submitSurvey(userInput);
  }

  prepareSurveyQuestions() {
    const surveyKey = keys(this.props.surveyContent)[0];
    const survey = this.props.surveyContent[surveyKey];
    const questions = survey && survey.questions;
    const components = [];
    const userInput = this.props.userInput;

    questions.forEach((question, index) => {
      if (!question) return;

      /* eslint-disable react/no-array-index-key */
      switch (question.type) {
        case 'numeric':
          components.push(
            <NumericQuestion
              key={index}
              title={question.title}
              value={userInput[index]}
              labelMin={question.labelMin}
              labelMax={question.labelMax}
              surveyPosition={index + 1}
              onClick={(value, position) => this.props.setUserInput(value, position)}
            />);
          break;
        case 'graphic':
          components.push(
            <GraphicQuestion
              key={index}
              title={question.title}
              value={userInput[index]}
              surveyPosition={index + 1}
              onClick={(value, position) => this.props.setUserInput(value, position)}
            />);
          break;
        default: // text
          components.push(
            <TextQuestion
              key={index}
              title={question.title}
              value={userInput[index]}
              classes={styles.surveyTextQuestion}
              surveyPosition={index + 1}
              onBlur={(value, position) => this.props.setUserInput(value, position)}
            />);
      /* eslint-enable react/no-array-index-key */
      }
    });

    return components;
  }

  renderLoaderOrSurvey(survey: { surveyTitle: string | void, start: string | void }) {
    if (isEmpty(survey)) return <Loader />;

    const surveyTitle = survey.surveyTitle;
    const startDate = survey.start && moment.unix(survey.start).format('MMM Do YYYY');
    const spinnerOptions = {
      color: 'white',
      lines: 9,
      width: 2,
      length: 3,
      radius: 4,
      hwaccel: true
    };

    return (
      <CardContainer header={surveyTitle} icon="feedback" startDate={startDate}>
        <div className={styles.surveyFormContainer}>
          {survey && this.prepareSurveyQuestions()}
          <hr />
          <Checkbox
            label="Anonymous"
            id="anonymousCheckbox"
            classes={styles.surveyCheckbox}
            isChecked={this.props.anonymous}
            onClick={() => { this.props.toggleAnonymous(); }}
          />
          <button className="blueButton" onClick={() => this.submit()}>
            {this.props.buttonSpinnerActive ? <ReactSpinner config={spinnerOptions} /> : 'Submit'}
          </button>
        </div>
      </CardContainer>
    );
  }

  render() {
    const surveyKey = keys(this.props.surveyContent)[0];
    const survey = this.props.surveyContent[surveyKey] || {};

    return (
      <section className={styles.survey}>
        <Header activeTab="survey" {...this.props} />
        <div className="tabContainer">
          {this.renderLoaderOrSurvey(survey)}
        </div>
      </section>
    );
  }
}

Survey.propTypes = {
  anonymous: PropTypes.bool,
  fetchSurvey: PropTypes.func.isRequired,
  submitSurvey: PropTypes.func.isRequired,
  setUserInput: PropTypes.func.isRequired,
  toggleAnonymous: PropTypes.func.isRequired,
  buttonSpinnerActive: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  surveyContent: PropTypes.object,
  userInput: PropTypes.array
  /* eslint-enable react/forbid-prop-types */
};
