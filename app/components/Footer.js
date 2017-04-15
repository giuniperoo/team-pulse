// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../styles/Footer.scss';


export default class Footer extends Component {
  static defaultProps = { withLogoutLink: false }

  render() {
    const logout = this.props.logout;
    const withLogoutLink = this.props.withLogoutLink;

    return (
      <div className={styles.footer}>
        <p>Version 1.0.0</p>
        <Link to="/user-profile" className={styles.footerLink}>Terms of Service</Link>
        <Link to="/user-profile" className={styles.footerLink}>Privacy</Link>
        {withLogoutLink && <button className={styles.footerLink} onClick={logout}>Logout</button>}
      </div>
    );
  }
}

Footer.propTypes = {
  logout: PropTypes.func.isRequired,
  withLogoutLink: PropTypes.bool
};
