// @flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.css';
import HeaderTab from './HeaderTab';

const cx = classNames.bind(styles);

export default class Header extends Component {
  render() {
    const sliderClassName = cx(styles.slider, {
      'sliderActive-1': this.props.activeTab === 'survey',
      'sliderActive-2': this.props.activeTab === 'feedback',
      'sliderActive-3': this.props.activeTab === 'userProfile'
    });

    return (
      <div className={styles.header}>
        <HeaderTab name="Survey" path="/survey" icon="pulse" {...this.props} />
        <HeaderTab name="Feedback" path="/feedback" icon="feedback" {...this.props} />
        <HeaderTab name="User Profile" path="/user-profile" icon="profile" {...this.props} />
        <div className={sliderClassName} />
      </div>
    );
  }
}

Header.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
