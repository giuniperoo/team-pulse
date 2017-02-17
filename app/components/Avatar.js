// @flow
import React, { Component, PropTypes } from 'react';
import styles from '../styles/Avatar.css';

export default class Avatar extends Component {

  static defaultProps = {
    inEditMode: false
  }

  render() {
    return (
      <div className={styles.avatar}>
        Avatar
      </div>
    );
  }
}

Avatar.propTypes = {
  inEditMode: PropTypes.bool
};
