// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import camelCase from 'lodash/camelCase';
import styles from './HeaderTab.css';


export default class HeaderTab extends Component {
  render() {
    const classes = classNames(styles.headerTab, {
      active: this.props.activeTab === camelCase(this.props.name)
    });

    return (
      <div className={classes}>
        <Link to={this.props.path}>{this.props.name}</Link>
      </div>
    );
  }
}

HeaderTab.propTypes = {
  activeTab: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired
};
