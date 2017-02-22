// @flow
import React, { Component, PropTypes } from 'react';
import styles from '../styles/Avatar.css';

export default class Avatar extends Component {

  static defaultProps = {
    photoUrl: null,
    inEditMode: false
  }

  render() {
    console.log(this.props.photoUrl);
    if (this.props.inEditMode) {
      // TODO
      return <div className={styles.avatar} />;
    }
    return <div className={styles.avatar} />;
  }
}

Avatar.propTypes = {
  photoUrl: PropTypes.string,
  inEditMode: PropTypes.bool
};
