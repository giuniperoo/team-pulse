// @flow
import React, { Component, PropTypes } from 'react';
import { map, includes, pick } from 'lodash';
import classNames from 'classnames/bind';
import * as firebase from 'firebase';
import OverlayNotice from './OverlayNotice';
import styles from '../styles/App.scss';

const cx = classNames.bind(styles);

export default class App extends Component {
  static defaultProps = { children: null }

  componentWillMount() {
    this.handleFirebaseInitialization();
    this.detectOffline();
  }

  handleFirebaseInitialization() {
    const config = {
      apiKey: 'AIzaSyAgDXaM3G0WizjDejx-XxreQXEoUf8pKyU',
      authDomain: 'team-pulse-6ed1c.firebaseapp.com',
      databaseURL: 'https://team-pulse-6ed1c.firebaseio.com',
      projectId: 'team-pulse-6ed1c',
      storageBucket: 'team-pulse-6ed1c.appspot.com',
      messagingSenderId: '618048040108'
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      const router = this.props.router;
      const currentPathname = router.getCurrentLocation().pathname;
      const routePaths = map(router.routes[0].childRoutes, route => route.path);

      if (user) {
        // if no user data in store, retrieve and save it (can happen on page reload)
        if (!this.props.user.uid) {
          // Some user properties (`uid`, `displayName`, `email`, `photoURL`, and `emailVerified`)
          // come from the firebase User object (https://firebase.google.com/docs/reference/js/firebase.User).
          // The rest are app-specific and are stored in the `users` path of the database.
          const usersRef = firebase.database().ref('users');

          usersRef.child(user.uid).once('value')
            .then(snapshot => {
              let userObj = pick(user, [
                'uid',
                'displayName',
                'email',
                'photoURL',
                'emailVerified'
              ]);

              userObj = Object.assign(userObj, snapshot.val());
              return this.props.storeUserData(userObj);
            })
            .catch(error => console.error('error', error));
        }

        // user is logged in
        if (currentPathname === '/login' || !includes(routePaths, currentPathname)) {
          const DEFAULT_LOGGED_IN_ROUTE = '/survey';
          router.push(DEFAULT_LOGGED_IN_ROUTE);
        }
      } else {
        // user is logged out
        const DEFAULT_LOGGED_OUT_ROUTE = '/login';
        if (currentPathname !== DEFAULT_LOGGED_OUT_ROUTE) {
          router.push(DEFAULT_LOGGED_OUT_ROUTE);
        }
      }
    }, (error) => {
      console.error(error);
    });
  }

  // https://firebase.google.com/docs/database/web/offline-capabilities
  detectOffline() {
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', snapshot => {
      if (snapshot.val() === true) {
        // we're connected (or reconnected)
        this.props.toggleOffline(false);
      } else {
        this.props.toggleOffline(true);
      }
    });
  }

  render() {
    const className = cx(styles.app, {
      offline: this.props.offline
    });

    return (
      <div className={className}>
        {this.props.offline && <OverlayNotice text="You appear to be offline" />}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  router: PropTypes.object.isRequired,
  children: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  storeUserData: PropTypes.func.isRequired,
  toggleOffline: PropTypes.func.isRequired,
  offline: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired
};
