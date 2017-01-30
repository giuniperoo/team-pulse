// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import camelCase from 'lodash/camelCase';
import styles from './HeaderTab.css';

const cx = classNames.bind(styles);

export default class HeaderTab extends Component {
  render() {
    const className = cx(styles.headerTab, `icon-${this.props.icon}`, {
      active: this.props.activeTab === camelCase(this.props.name)
    });

    return (
      (this.props.activeTab === camelCase(this.props.name)) ?
        <div className={className} />
      :
        <Link to={this.props.path} className={className} />
    );
  }
}

HeaderTab.propTypes = {
  activeTab: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired
};
