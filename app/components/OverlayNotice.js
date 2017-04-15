// @flow
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from '../styles/OverlayNotice.scss';


export default class OverlayNotice extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="overlayNoticeFade"
        transitionAppear
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <div key="overlayNoticeFade" className={styles.overlayNotice}>{this.props.text}</div>
      </ReactCSSTransitionGroup>
    );
  }
}

OverlayNotice.propTypes = {
  text: PropTypes.string.isRequired
};
