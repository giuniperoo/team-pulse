// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import camelCase from 'lodash/camelCase';

@Radium
class HeaderTab extends Component {
  render() {
    return (
      (this.props.activeTab === camelCase(this.props.name)) ?
        <div
          className={`icon-${this.props.icon}`}
          style={[styles.base, styles.active]}
        />
      :
        <Link
          to={this.props.path}
          className={`icon-${this.props.icon}`}
          style={styles.base}
          onClick={() => this.props.changeTab(this.props.activeTab)}
        />
    );
  }
}

HeaderTab.propTypes = {
  activeTab: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  changeTab: React.PropTypes.func.isRequired
};

const styles = {
  base: {
    color: '#d1d1d1',
    flexGrow: 1,
    background: 'white',
    textAlign: 'center',
    transition: 'color 300ms',
    textDecoration: 'none',

    ':before': { lineHeight: '35px' },

    ':hover': { color: '#9b9b9b' }
  },

  active: { color: '#0f93fc' }
};

module.exports = HeaderTab;
