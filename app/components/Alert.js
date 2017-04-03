// @flow
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from '../styles/Alert.css';


export default class Alert extends Component {
  static defaultProps = {
    text: 'Oh dear, something went wrong. Maybe try refreshing the app ( ⌘R ).'
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="alertSlide"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {this.props.active && <div key="alertSlide" className={styles.alert}>{this.props.text}</div>}
      </ReactCSSTransitionGroup>
    );
  }
}

Alert.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool.isRequired
};
