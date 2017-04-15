// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import camelCase from 'lodash/camelCase';
import styles from '../styles/HeaderTab.scss';

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
        <Link
          to={this.props.path} className={className}
          onClick={() => this.props.changeTab(this.props.activeTab)}
        />
    );
  }
}

HeaderTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired
};
