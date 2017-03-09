// @flow
import React, { Component, PropTypes } from 'react';
import styles from '../styles/Avatar.css';

export default class Avatar extends Component {
  static defaultProps = {
    photoUrl: null,
    inEditMode: false
  }

  render() {
    if (this.props.inEditMode) {
      if (this.props.photoUrl) {
        return <div className={styles.avatar} />;
      }
      return <div className={`icon-satisfied ${styles.avatar}`} />;
    }

    if (this.props.photoUrl) {
      return <div className={styles.avatar} />;
    }
    return <div className={`icon-satisfied ${styles.avatar}`} />;
  }
}

Avatar.propTypes = {
  photoUrl: PropTypes.string,
  inEditMode: PropTypes.bool
};
