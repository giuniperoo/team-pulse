// @flow
import React, { Component, PropTypes } from 'react';
import * as firebase from 'firebase';
import styles from '../styles/Login.css';

export default class LoginPage extends Component {
  login() {
    const email = 'giunipero@gmail.com';
    const password = 'blahblah1';
    const router = this.props.router;

    function signInSuccess(response) {
      console.log('signInSuccess', response);
      router.push('/survey');
    }

    function signInError(response) { console.log('signInError', response); }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(signInSuccess)
      .catch(signInError);
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <img className={styles.logo} src="../resources/images/team-pulse-logo.svg" alt="TeamPulse logo" />
          <h1>Welcome to TeamPulse</h1>
          <h2 style={{ marginBottom: 20 }}>Login with your credentials</h2>

          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button className="blueButton" onClick={() => this.login()}>Login</button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  // eslint-disable-next-line
  router: PropTypes.object.isRequired
};
