// @flow
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Alert from './Alert';
import Header from './Header';
import Footer from './Footer';
import Avatar from './Avatar';
import Checkbox from './Checkbox';
import styles from '../styles/UserProfile.css';


export default class UserProfile extends Component {
  render() {
    const startDate = moment.utc(this.props.user.startDate).format('MMM Do, YYYY');
    const anonymous = this.props.user.anonymous;
    const uid = this.props.user.uid;

    return (
      <section className={styles.userProfile}>
        <Header activeTab="userProfile" {...this.props} />

        <div className="tabContainer">
          <Alert active={this.props.alertActive} text={this.props.alertText} />
          <Avatar {...this.props} />
          <h2 className={styles.name}>{this.props.user.displayName}</h2>
          <p className={styles.email}>{this.props.user.email}</p>

          <section className={styles.attributesContainer}>
            <div>
              <p className={styles.label}>Team</p>
              <p className={styles.value}>{this.props.user.team}</p>
            </div>
            <div>
              <p className={styles.label}>Location</p>
              <p className={styles.value}>{this.props.user.location}</p>
            </div>
            <div>
              <p className={styles.label}>Start Date</p>
              <p className={styles.value}>{startDate}</p>
            </div>

            <Checkbox
              id="defaultAnonymousCheckbox"
              label="Default to anonymous responses"
              isChecked={anonymous || false}
              onClick={() => { this.props.toggleDefaultAnonymous(uid, !anonymous); }}
            />
          </section>

          <Footer withLogoutLink logout={this.props.logout} />
        </div>
      </section>
    );
  }
}

UserProfile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    team: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    anonymous: PropTypes.bool,
    startDate: PropTypes.number,
    displayName: PropTypes.string
  }).isRequired,
  alertText: PropTypes.string.isRequired,
  alertActive: PropTypes.bool.isRequired,
  toggleDefaultAnonymous: PropTypes.func.isRequired
};
