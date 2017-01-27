// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './HeaderTab.css';


export default class HeaderTab extends Component {
  render() {
    return (
      <div className={styles.headerTab}>
        <Link to={this.props.path}>{this.props.name}</Link>
      </div>
    );
  }
}
