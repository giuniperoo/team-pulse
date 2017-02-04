// @flow
import React, { Component } from 'react';
import Header from './Header';

export default class UserProfile extends Component {
  render() {
    return (
      <section>
        <Header activeTab="userProfile" {...this.props} />
        <div className="tabContainer" />
      </section>
    );
  }
}
