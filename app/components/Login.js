// @flow
import React, { Component, PropTypes } from 'react';
import ButtonWithSpinner from './ButtonWithSpinner';
import styles from '../styles/Login.css';

export default class Login extends Component {

  emailInput = null;
  passwordInput = null;

  login() {
    if (!this.emailInput || !this.passwordInput) return false;

    // rather than place user credentials directly in
    // the store let's just grab them from the DOM
    const email = this.emailInput.value || 'giuniperoo@teampulse.com';
    const password = this.passwordInput.value || 'oklahoma79';
    this.props.login(email, password);
  }

  render() {
    return (
      <div style={{ opacity: 0 }} className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <img className={styles.logo} src="../resources/images/team-pulse-logo.svg" alt="TeamPulse logo" />
          <h1>Welcome to TeamPulse</h1>
          <h2 style={{ marginBottom: 20 }}>Login with your credentials</h2>

          <input type="email" name="email" placeholder="Email" onKeyPress={(event) => { if (event.key === 'Enter') this.login(); }} ref={$input => { this.emailInput = $input; }} />
          <input type="password" name="password" placeholder="Password" onKeyPress={(event) => { if (event.key === 'Enter') this.login(); }} ref={$input => { this.passwordInput = $input; }} />
          <ButtonWithSpinner label="Login" onClick={() => this.login()} buttonSpinnerActive={this.props.buttonSpinnerActive} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  buttonSpinnerActive: PropTypes.bool.isRequired
};
