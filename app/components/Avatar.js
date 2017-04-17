// @flow
import React, { Component, PropTypes } from 'react';
import ReactSpinner from 'react-spinjs';
import styles from '../styles/Avatar.scss';

export default class Avatar extends Component {
  spinnerOptions: {}

  static defaultProps = {
    photoURL: null
  }

  constructor() {
    super();
    this.spinnerOptions = {
      color: '#d1d1d1',
      lines: 9,
      width: 2,
      length: 6,
      radius: 6,
      hwaccel: true
    };
  }

  componentWillMount() {
    // load avatar image when user already has app loaded
    // and tabs into view with avatar for the first time
    if (this.props.user.photoURL) this.loadAvatarImage(this.props.user.photoURL);
  }

  componentWillReceiveProps(nextProps: { user: { photoURL: ?string }}) {
    // load avatar image when app is (re)loaded or when user uploads new image
    if (nextProps.user.photoURL && this.props.user.photoURL !== nextProps.user.photoURL) {
      this.loadAvatarImage(nextProps.user.photoURL);
    }
  }

  getInitials() {
    const name = this.props.user.displayName;
    if (!name) return '';

    const nameArray = name.split(' ');
    const firstInit = nameArray[0][0];
    const lastInit = (nameArray.length > 1) ? nameArray[nameArray.length - 1][0] : '';
    return firstInit + lastInit;
  }

  loadAvatarImage(url: string) {
    const img = new Image();
    img.onload = () => this.props.toggleAvatarImageLoaded(true);
    img.onerror = () => this.props.toggleAvatarImageLoaded(true);
    img.src = url;
  }

  // eslint-disable-next-line flowtype/no-weak-types
  handleFile(event: {target: Object}) {
    const file = event.target.files[0];

    if (file.size > 500000) {
      return this.props.toggleAlert(true, 'Image shouldn\'t be larger than 500 KB. Sorry bout that.');
    }

    if (this.props.alertActive) this.props.toggleAlert(false);

    this.props.toggleAvatarImageLoaded(false);

    return this.props.uploadAvatar(this.props.user.uid, file);
  }

  render() {
    // show spinner if user data or avatar image not yet loaded
    if (!this.props.user.uid || !this.props.avatarImageLoaded) {
      return (
        <div className={styles.avatarContainer}>
          <ReactSpinner config={this.spinnerOptions} />
        </div>
      );
    }

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
  uploadAvatar: PropTypes.func.isRequired,
  avatarImageLoaded: PropTypes.bool.isRequired,
  toggleAvatarImageLoaded: PropTypes.func.isRequired
};
