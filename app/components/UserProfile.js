// @flow
import React, { Component } from 'react';
import Header from './Header';
import UserProfileContent from './UserProfileContent';

export default class UserProfile extends Component {
  render() {
    return (
      <div>
        <Header activeTab="userProfile" {...this.props} />
        <UserProfileContent />
      </div>
    );
  }
}
