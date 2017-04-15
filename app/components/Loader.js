// @flow
import React, { Component } from 'react';
import styles from '../styles/Loader.scss';


// adapted from http://codepen.io/supah/pen/BjYLdW
export default class Loader extends Component {
  render() {
    return (
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
      </svg>
    );
  }
}
