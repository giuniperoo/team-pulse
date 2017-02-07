// @flow
import React, { Component } from 'react';
import { isEmpty, keys } from 'lodash';
import moment from 'moment';
import Header from './Header';
import CardContainer from './CardContainer';
import TextQuestion from './TextQuestion';
import NumericQuestion from './NumericQuestion';
import GraphicQuestion from './GraphicQuestion';


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
          components.push(<NumericQuestion key={index} title={question.title} />);
          break;
        case 'graphic':
          components.push(<GraphicQuestion key={index} title={question.title} />);
          break;
        default: // text
          components.push(<TextQuestion key={index} title={question.title} />);
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
      <section>
        <Header activeTab="survey" {...this.props} />
        <div className="tabContainer">
          <CardContainer header={surveyTitle} icon="feedback" startDate={startDate}>
            {survey && this.prepareSurveyQuestions()}
          </CardContainer>
        </div>
      </section>
    );
  }
}

Survey.propTypes = {
  fetchSurvey: React.PropTypes.func.isRequired,
  // eslint-disable-next-line
  surveyContent: React.PropTypes.object
};
