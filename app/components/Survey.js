// @flow
import React, { Component } from 'react';
import Header from './Header';
import SurveyContent from './SurveyContent';


export default class Survey extends Component {
  render() {
    return (
      <div>
        <Header activeTab="survey" />
        <SurveyContent />
      </div>
    );
  }
}
