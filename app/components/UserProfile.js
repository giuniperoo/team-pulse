// @flow
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';
import Avatar from './Avatar';
import ButtonWithSpinner from './ButtonWithSpinner';
import styles from '../styles/UserProfile.css';


export default class UserProfile extends Component {
  render() {
    const photoUrl = this.props.user && this.props.user.photoUrl;

    return (
      <section className={styles.userProfile} style={{ opacity: 0 }}>
        <Header activeTab="userProfile" {...this.props} />
        <div className="tabContainer">
          <Avatar photoUrl={photoUrl} />
          <h2 className={styles.name}>Justino ScalottbusserTör</h2>
          <p className={styles.email}>justin@teampulse.com</p>

          <section className={styles.attributesContainer}>
            <div>
              <span className={styles.label}>Start Date</span>
              <span className={styles.value}>February 20, 2013</span>
            </div>
            <div>
              <span className={styles.label}>Team</span>
              <span className={styles.value}>Berlin</span>
            </div>
            <div>
              <span className={styles.label}>Location</span>
              <span className={styles.value}>Berlin, DE</span>
            </div>
            <div>
              <span className={styles.label}>Default to anonymous responses</span>
              <span className={styles.value}>ON</span>
            </div>
          </section>

          <ButtonWithSpinner
            label="Edit Profile"
            onClick={() => this.props.editUserProfile()}
            buttonSpinnerActive={this.props.buttonSpinnerActive}
          />

          <Footer withLogoutLink logout={this.props.logout} />
        </div>
      </section>
    );
  }
}

UserProfile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    photoUrl: PropTypes.string
  }).isRequired,
  editUserProfile: PropTypes.func.isRequired,
  buttonSpinnerActive: PropTypes.bool.isRequired
};
