// @flow
import React, { Component } from 'react';
import * as firebase from 'firebase';
import styles from '../styles/Login.css';

export default class LoginPage extends Component {
  login() {
    const email = 'giunipero@gmail.com';
    const password = 'blahblah1';
    const router = this.props.router;

    function signInSuccess(response) {
      console.log('signInSuccess', response);
      router.push('/feedback');
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
          <button className={styles.loginButton} onClick={() => this.login()}>Login</button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  // eslint-disable-next-line
  router: React.PropTypes.object.isRequired
};
