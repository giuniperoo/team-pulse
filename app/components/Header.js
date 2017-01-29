// @flow
import React, { Component } from 'react';
import styles from './Header.css';
import HeaderTab from './HeaderTab';


export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <HeaderTab name="Survey" path="/survey" {...this.props} />
        <HeaderTab name="Feedback" path="/feedback" {...this.props} />
        <HeaderTab name="User Profile" path="/user-profile" {...this.props} />
      </div>
    );
  }
}
