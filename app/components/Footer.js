// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../styles/Footer.css';


export default class Footer extends Component {
  static defaultProps = { withLogoutLink: false }

  render() {
    return (
      <div className={styles.footer}>
        <hr />
        <p>Version 1.0.0</p>
        <Link to="/tos">Terms of Service</Link>
        <Link to="/privacy">Privacy</Link>
        {this.props.withLogoutLink && <Link to="/logout">Logout</Link> }
      </div>
    );
  }
}

Footer.propTypes = {
  withLogoutLink: PropTypes.bool
};
