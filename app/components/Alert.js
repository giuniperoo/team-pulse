// @flow
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from '../styles/Alert.css';


export default class Alert extends Component {
  static defaultProps = {
    text: 'Uh oh, something bad happened'
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="alertFade"
        transitionAppear
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <div key="alertFade" className={styles.alert}>{this.props.text}</div>
      </ReactCSSTransitionGroup>
    );
  }
}

Alert.propTypes = {
  text: PropTypes.string
};
