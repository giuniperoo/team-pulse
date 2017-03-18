// @flow
import React, { Component, PropTypes } from 'react';
import styles from '../styles/Avatar.css';

export default class Avatar extends Component {
  static defaultProps = {
    photoURL: null,
    inEditMode: false
  }

  render() {
    if (this.props.inEditMode) {
      if (this.props.photoURL) {
        return <img src={this.props.photoURL} alt="user avatar" className={styles.avatar} />;
      }
      return <div className={`icon-satisfied ${styles.avatar}`} />;
    }

    if (this.props.photoURL) {
      return <img src={this.props.photoURL} alt="user avatar" className={styles.avatar} />;
    }
    return <div className={`icon-satisfied ${styles.avatar}`} />;
  }
}

Avatar.propTypes = {
  photoURL: PropTypes.string,
  inEditMode: PropTypes.bool
};
