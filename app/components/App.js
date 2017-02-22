// @flow
import React, { Component, PropTypes } from 'react';
import { map, includes } from 'lodash';
import * as firebase from 'firebase';


export default class App extends Component {
  static defaultProps = {
    children: null
  }

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBgTMhh1ONCNi5leEy1DNz2TgQQX8M33og',
      authDomain: 'team-pulse-magic.firebaseapp.com',
      databaseURL: 'https://team-pulse-magic.firebaseio.com',
      storageBucket: 'team-pulse-magic.appspot.com',
      messagingSenderId: '114176198859'
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      const router = this.props.router;
      const currentPathname = router.getCurrentLocation().pathname;
      const routePaths = map(router.routes[0].childRoutes, route => route.path);

      if (user) {
        if (!this.props.user.uid) {
          // if no user data in store, save it (can happen on page reload)
          this.props.storeUserData(user);
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

  render() {
    return (
      <div>
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
  user: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired
};
