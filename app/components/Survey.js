// @flow
import React, { Component } from 'react';
import { isEmpty, keys } from 'lodash';
import moment from 'moment';
import Header from './Header';
import CardContainer from './CardContainer';


export default class Survey extends Component {
  componentWillMount() {
    if (isEmpty(this.props.surveyContent)) {
      this.props.fetchSurvey();
    }
  }

  render() {
    const surveyKey = keys(this.props.surveyContent)[0];
    const survey = this.props.surveyContent[surveyKey];
    const surveyTitle = survey && survey.surveyTitle;
    const startDate = survey && survey.start && moment.unix(survey.start).format('MMM Do YYYY');

    return (
      <div>
        <Header activeTab="survey" {...this.props} />
        <div className="tabContainer">
          <CardContainer header={surveyTitle} icon="feedback" startDate={startDate} />
        </div>
      </div>
    );
  }
}

Survey.propTypes = {
  fetchSurvey: React.PropTypes.func.isRequired,
  // eslint-disable-next-line
  surveyContent: React.PropTypes.object
};
