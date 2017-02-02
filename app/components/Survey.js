// @flow
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Header from './Header';


export default class Survey extends Component {
  componentWillMount() {
    if (isEmpty(this.props.surveyContent)) {
      this.props.fetchSurvey();
    }
  }

  render() {
    const survey = this.props.surveyContent;
    return (
      <div>
        <Header activeTab="survey" {...this.props} />
        <div style={{ padding: '20px' }}>{JSON.stringify(survey)}</div>
      </div>
    );
  }
}

Survey.propTypes = {
  fetchSurvey: React.PropTypes.func.isRequired,
  // eslint-disable-next-line
  surveyContent: React.PropTypes.object
};
