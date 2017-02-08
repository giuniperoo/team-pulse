// @flow
import React, { Component, PropTypes } from 'react';
import { isEmpty, keys } from 'lodash';
import moment from 'moment';
import Header from './Header';
import Checkbox from './Checkbox';
import CardContainer from './CardContainer';
import TextQuestion from './TextQuestion';
import NumericQuestion from './NumericQuestion';
import GraphicQuestion from './GraphicQuestion';
import styles from '../styles/Survey.css';


export default class Survey extends Component {
  componentWillMount() {
    if (isEmpty(this.props.surveyContent)) {
      this.props.fetchSurvey();
    }
  }

  prepareSurveyQuestions() {
    const surveyKey = keys(this.props.surveyContent)[0];
    const survey = this.props.surveyContent[surveyKey];
    const questions = survey && survey.questions;

    const components = [];

    questions.forEach((question, index) => {
      if (!question) return;

      /* eslint-disable react/no-array-index-key */
      switch (question.type) {
        case 'numeric':
          components.push(<NumericQuestion
            key={index}
            title={question.title}
            labelMin={question.labelMin}
            labelMax={question.labelMax}
          />);
          break;
        case 'graphic':
          components.push(<GraphicQuestion key={index} title={question.title} />);
          break;
        default: // text
          components.push(
            <TextQuestion
              key={index}
              title={question.title}
              classes={styles.surveyTextQuestion}
            />);
      /* eslint-enable react/no-array-index-key */
      }
    });

    return components;
  }

  render() {
    const surveyKey = keys(this.props.surveyContent)[0];
    const survey = this.props.surveyContent[surveyKey];
    const surveyTitle = survey && survey.surveyTitle;
    const startDate = survey && survey.start && moment.unix(survey.start).format('MMM Do YYYY');

    return (
      <section className={styles.survey}>
        <Header activeTab="survey" {...this.props} />
        <div className="tabContainer">
          <CardContainer header={surveyTitle} icon="feedback" startDate={startDate}>
            <div className={styles.surveyFormContainer}>
              {survey && this.prepareSurveyQuestions()}
              <hr />
              <Checkbox
                label="Anonymous"
                id="anonymousCheckbox"
                classes={styles.surveyCheckbox}
                onClick={() => console.log('toggle anon')}
              />
              <button className="blueButton" onClick={() => console.log('submit')}>Submit</button>
            </div>
          </CardContainer>
        </div>
      </section>
    );
  }
}

Survey.propTypes = {
  fetchSurvey: PropTypes.func.isRequired,
  // eslint-disable-next-line
  surveyContent: PropTypes.object
};
