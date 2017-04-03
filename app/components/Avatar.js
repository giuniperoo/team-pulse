// @flow
import React, { Component, PropTypes } from 'react';
import styles from '../styles/Avatar.css';

export default class Avatar extends Component {
  static defaultProps = {
    photoURL: null
  }

  getInitials() {
    const name = this.props.user.displayName;
    if (!name) return '';

    const nameArray = name.split(' ');
    const firstInit = nameArray[0][0];
    const lastInit = (nameArray.length > 1) ? nameArray[nameArray.length - 1][0] : '';
    return firstInit + lastInit;
  }

  // eslint-disable-next-line flowtype/no-weak-types
  handleFile(event: {target: Object}) {
    const file = event.target.files[0];

    if (file.size > 500000) {
      return this.props.toggleAlert(true, 'Image shouldn\'t be larger than 500 KB. Sorry bout that.');
    }

    if (this.props.alertActive) this.props.toggleAlert(false);

    return this.props.uploadAvatar(this.props.user.uid, file);
  }

  render() {
    const photoURL = this.props.user.photoURL;

    return (
      <label className={styles.avatarContainer} htmlFor="fileInput">

        {photoURL ?
          <span>
            <div className={styles.avatarOverlay}>+</div>
            <div className={styles.avatarImage} style={{ backgroundImage: `url(${photoURL})` }} />
          </span>
        :
          <div className={styles.initialsContainer}>
            <div className={styles.initials}>{this.getInitials()}</div>
            <div className={styles.addAvatar}>+</div>
          </div>
        }

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={event => this.handleFile(event)}
        />
      </label>
    );
  }
}

Avatar.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    photoURL: PropTypes.string,
    displayName: PropTypes.string
  }).isRequired,
  toggleAlert: PropTypes.func.isRequired,
  alertActive: PropTypes.bool.isRequired,
  uploadAvatar: PropTypes.func.isRequired
};
