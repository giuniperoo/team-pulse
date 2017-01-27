// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Header.css';
import HeaderTab from './HeaderTab.js';


export default class Header extends Component {

  render() {
    return (
      <div className={styles.header}>
        <HeaderTab name="Survey" path="/survey" />
        <HeaderTab name="Feedback" path="/feedback" />
        <HeaderTab name="User Profile" path="/user-profile" />
      </div>
    );
  }
}
