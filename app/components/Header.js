// @flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/Header.css';
import HeaderTab from './HeaderTab';

const cx = classNames.bind(styles);

export default class Header extends Component {
  static getSlideTransitionClass(tab: string) {
    switch (tab) {
      case 'feedback':
        return styles.sliderActive2;
      case 'userProfile':
        return styles.sliderActive3;
      default:
        return styles.sliderActive1;
    }
  }

  componentDidUpdate() {
    const $slider = document.getElementById('slider');
    const sliderClassName = cx(styles.slider,
      Header.getSlideTransitionClass(this.props.activeTab));
    if ($slider) $slider.className = sliderClassName;
  }

  render() {
    const sliderClassName = cx(styles.slider,
      Header.getSlideTransitionClass(this.props.displayedTab || this.props.activeTab));

    return (
      <div className={styles.header}>
        <HeaderTab name="Survey" path="/survey" icon="pulse" {...this.props} />
        <HeaderTab name="Feedback" path="/feedback" icon="feedback" {...this.props} />
        <HeaderTab name="User Profile" path="/user-profile" icon="profile" {...this.props} />
        <div id="slider" className={sliderClassName} />
      </div>
    );
  }
}

Header.propTypes = {
  activeTab: React.PropTypes.string.isRequired,
  displayedTab: React.PropTypes.string.isRequired
};
