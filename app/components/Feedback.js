// @flow
import React, { Component } from 'react';
import Header from './Header';
import FeedbackContent from './FeedbackContent';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <Header activeTab="feedback" {...this.props} />
        <FeedbackContent />
      </div>
    );
  }
}
