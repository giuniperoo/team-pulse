// @flow
import React, { Component, PropTypes } from 'react';
import ReactSpinner from 'react-spinjs';
import styles from '../styles/Login.css';

export default class Login extends Component {
  componentWillReceiveProps(nextProps: { user: {}}) {
    if (nextProps.user.authenticated) {
      this.props.router.push('/survey');
    }
  }

  emailInput = null;
  passwordInput = null;

  login() {
    if (!this.emailInput || !this.passwordInput) return false;

    // rather than place user credentials directly in
    // the store let's just grab them from the DOM
    const email = this.emailInput.value || 'giunipero@gmail.com';
    const password = this.passwordInput.value || 'blahblah1';
    this.props.login(email, password);
  }

  render() {
    const spinnerOptions = {
      color: 'white',
      lines: 9,
      width: 2,
      length: 3,
      radius: 4,
      hwaccel: true
    };

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <img className={styles.logo} src="../resources/images/team-pulse-logo.svg" alt="TeamPulse logo" />
          <h1>Welcome to TeamPulse</h1>
          <h2 style={{ marginBottom: 20 }}>Login with your credentials</h2>

          <input type="email" name="email" placeholder="Email" ref={input => { this.emailInput = input; }} />
          <input type="password" name="password" placeholder="Password" ref={input => { this.passwordInput = input; }} />
          <button className="blueButton" onClick={() => this.login()}>
            {this.props.buttonSpinnerActive ? <ReactSpinner config={spinnerOptions} /> : 'Login'}
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  router: PropTypes.object.isRequired,
  buttonSpinnerActive: PropTypes.bool.isRequired
};
