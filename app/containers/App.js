// @flow
import React, { Component } from 'react';
import { map, includes } from 'lodash';
import * as firebase from 'firebase';


export default class App extends Component {
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
      const childRoutes = map(router.routes[0].childRoutes, route => route.path);

      if (user) {
        // user is logged in
        if (currentPathname === '/login' || !includes(childRoutes, currentPathname)) {
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

  props: {
    // eslint-disable-next-line flowtype/no-weak-types
    router: Object,
    children: HTMLElement
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
