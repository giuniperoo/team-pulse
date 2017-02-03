// @flow
import React, { Component } from 'react';
import Header from './Header';

export default class UserProfile extends Component {
  render() {
    return (
      <div>
        <Header activeTab="userProfile" {...this.props} />
        <div className="tabContainer" />
      </div>
    );
  }
}
